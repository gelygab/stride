import io from "socket.io-client";
import React, { useEffect, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Aurora from './reactbitsdashboard/Aurora';
import SplitFlapText from './reactbitsdashboard/SplitFlapText';
import BorderGlow from './reactbitsdashboard/BorderGlow';
import assets from '../../assets/assets';
import styles from './dashboard.module.css';
// import { create } from "node:vfs";



const socket = io.connect("http://localhost:3001");


const formatTime = (timestamp) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(timestamp);


const createInitialReadings = () => {
  const now = Date.now();
  return Array.from({ length: 12 }, (_, index) => ({
    time: now - (11 - index) * 5 * 60 * 1000,
    voltage: 0,
  }));
};


const createInitialCapacitorReading = () => ({
  capacitorVoltageV: 0,
  storedEnergyMj: 0,
  currentMa: 0,
  chargerConnected: true,
});


const createInitialTotalOutput = () => ({
  cumulativeEnergyWh: 0,
  outputPowerW: 0,
});


const Dashboard = ({ onBack }) => {


  // Voltage State
  const [voltageReadings, setVoltageReadings] = useState(createInitialReadings);
  const [capacitorReading, setCapacitorReading] = useState(createInitialCapacitorReading);
  const [totalOutput, setTotalOutput] = useState(createInitialTotalOutput);
  const [footstepPulseCount, setFootstepPulseCount] = useState(1250);
  const hasBackendFootstepCount = useRef(false);
  const instantaneousVoltage = voltageReadings[voltageReadings.length - 1].voltage;


  useEffect(() => {
    const handleTelemetry = (data) => {
      console.log("Raw socket telemetry data: ", data);
      const now = Date.now();
      const oneHourAgo = now - 60 * 60 * 1000;

      let incomingVoltage = 0;
      let incomingCurrent = 0;
      let incomingPower = 0;
      let incomingEnergy = 0;

      if (typeof data === 'number') {
        incomingVoltage = data;
      } else if (typeof data === 'string') {
        incomingVoltage = parseFloat(data) || 0;
      } else if (data && typeof data === 'object') {
        incomingVoltage = Number(data.voltage || data.loadVoltage || data.load_voltage || 0);

        const incomingFootstepCount = Number(data.footstepPulseCount);
        if (
          data.footstepPulseCount !== undefined &&
          data.footstepPulseCount !== null &&
          Number.isFinite(incomingFootstepCount) &&
          incomingFootstepCount >= 0
        ) {
          hasBackendFootstepCount.current = true;
          setFootstepPulseCount(Math.floor(incomingFootstepCount));
        }
        incomingVoltage = Number(data.voltage ?? data.loadVoltage ?? data.load_voltage ?? 0);
        incomingCurrent = Number(data.current ?? data.current_mA ?? 0);
        incomingPower = Number(data.power ?? data.power_W ?? 0);
        incomingEnergy = Number(data.energy ?? data.energy_Wh ?? 0);
      }

      setVoltageReadings((readings) => [
        ...readings.filter((reading) => reading.time >= oneHourAgo),
        {
          time: now,
          voltage: incomingVoltage,
        },
      ]);

      setCapacitorReading((prev) => ({
        ...prev,
        capacitorVoltageV: incomingVoltage,
        storedEnergyMj: (0.5 * 0.000010 * Math.pow(incomingVoltage, 2) * 1000000),
        currentMa: incomingCurrent,
        chargerConnected: Math.abs(incomingCurrent) <= 0.15 ? true : false, 
      }));

      setTotalOutput((prev) => ({
        ...prev,
        cumulativeEnergyWh: incomingEnergy,
        outputPowerW: incomingPower,
      }));
      
      const intervalId = window.setInterval(() => {
        if (!hasBackendFootstepCount.current) {
          setFootstepPulseCount((count) => count + (Math.random() < 0.25 ? 0 : 1));
        }
      }, 1500);
    }
    socket.on("telemetry_data", handleTelemetry);
    return () => socket.off("telemetry_data", handleTelemetry);
  }, []);

  return (
    <main className={styles.dashboardPage}>
      <div className={styles.auroraBackground} aria-hidden="true">
        <Aurora
          colorStops={['#40FFFC', '#00ffab', '#51fffb']}
          brightness={1.5}
          layers={2}
          glow={0.5}
          blend={0.8}
          amplitude={2.5}
          direction="bottom"
        />
      </div>


      <header className={styles.dashboardHeader}>
        <img className={styles.logo} src={assets.logo} alt="Stride" />
        <h1 className={styles.heading}>
          <SplitFlapText
            words={['                        ', 'Live Telemetry Dashboard']}
            flipDuration={0.1}
            stagger={0.018}
            cycleDelay={450}
            charset="alphanumeric"
            flipsPerChar={6}
            tileColor="#052929"
            textColor="#f5ffff"
            tileRadius={7}
            gap="clamp(1px, 0.5vw, 7px)"
            fontSize="var(--dashboard-title-font-size)"
            loop={false}
            className={styles.splitFlap}
          />
        </h1>
        <button className={styles.backButton} type="button" onClick={onBack}>
          Back to Homepage <span aria-hidden="true">↗</span>
        </button>
      </header>


      <BorderGlow
        className={styles.panelFrame}
        colors={['#00CDC9', '#00514F', '#38bdf8']}
        backgroundColor="#001411"
        glowColor="178 100 45"
        borderRadius={16}
        glowRadius={22}
        glowIntensity={1.25}
        edgeSensitivity={12}
        coneSpread={42}
        fillOpacity={0.18}
      >
        <section className={styles.panelGrid} aria-label="Telemetry dashboard panels">
          <div className={`${styles.panelBox} ${styles.powerPanel}`} aria-label="Voltage panel">
            <div className={styles.powerPanelHeader}>
              <span className={styles.liveBadge}>
                <span className={styles.liveDot} aria-hidden="true" />
                Live
              </span>
              <span className={styles.todayLabel}>Today</span>
            </div>
            <h2 className={styles.panelHeading}>Real-time Voltage Output</h2>
            <p className={styles.panelSubheading}>INA219 Sensor Feed</p>
            <div className={styles.powerChart} role="img" aria-label="Voltage readings in volts over time">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={voltageReadings} margin={{ top: 12, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="voltageAreaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#40fffc" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#008e8b" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(131, 166, 166, 0.2)"
                    strokeDasharray="3 4"
                  />
                  <XAxis
                    dataKey="time"
                    type="number"
                    scale="time"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={formatTime}
                    tick={{ fill: '#a9c1c1', fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(131, 166, 166, 0.35)' }}
                    tickCount={5}
                    minTickGap={18}
                  />
                  <YAxis
                    width={38}
                    domain={[0, 'auto']}
                    tick={{ fill: '#a9c1c1', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickCount={4}
                  >
                    <Label
                      value="Voltage (V)"
                      angle={-90}
                      position="insideLeft"
                      offset={6}
                      fill="#a9c1c1"
                      fontSize={10}
                    />
                  </YAxis>
                  <Tooltip
                    labelFormatter={formatTime}
                    formatter={(value) => [`${Number(value).toFixed(2)} V`, 'Voltage']}
                    contentStyle={{
                      border: '1px solid rgba(0, 205, 201, 0.6)',
                      borderRadius: 8,
                      background: 'rgba(0, 20, 17, 0.96)',
                      color: '#efffff',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#a9c1c1' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="voltage"
                    stroke="#40fffc"
                    strokeWidth={2}
                    fill="url(#voltageAreaFill)"
                    dot={false}
                    activeDot={{ r: 4, fill: '#40fffc', stroke: '#001411', strokeWidth: 2 }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.instantaneousReading} aria-live="polite">
              <p className={styles.instantaneousLabel}>Instantaneous Voltage</p>
              <p className={styles.instantaneousValue}>{instantaneousVoltage.toFixed(2)} V</p>
            </div>
          </div>
          <div className={`${styles.panelBox} ${styles.energyPanel}`} aria-label="Capacitor storage panel">
            <h2 className={styles.panelHeading}>Capacitor Storage</h2>
            <div className={styles.capacitorMetrics}>
              <div className={styles.capacitorEnergy}>
                <p className={styles.capacitorValue}>
                  <span>{capacitorReading.storedEnergyMj.toFixed(2)}</span>
                  <span className={styles.capacitorUnit}>µJ</span>
                </p>
                <p className={styles.capacitorMetricLabel}>Stored Energy</p>
              </div>
              <div className={styles.capacitorCurrent}>
                <p className={styles.capacitorMetricLabel}>Current</p>
                <p className={styles.capacitorCurrentValue}>
                  {capacitorReading.currentMa.toFixed(2)}
                  <span>mA</span>
                </p>
              </div>
            </div>
            <div
              className={styles.capacitorMeter}
              role="meter"
              aria-label="Capacitor voltage"
              aria-valuemin={0}
              aria-valuemax={6}
              aria-valuenow={capacitorReading.capacitorVoltageV}
              aria-valuetext={`${capacitorReading.capacitorVoltageV.toFixed(2)} volts`}
            >
              <div className={styles.capacitorMeterSegments} aria-hidden="true">
                {Array.from({ length: 30 }, (_, index) => (
                  <span
                    key={index}
                    className={index < Math.round((capacitorReading.capacitorVoltageV / 6) * 30)
                      ? `${styles.capacitorSegment} ${styles.capacitorSegmentFilled}`
                      : styles.capacitorSegment}
                  />
                ))}
              </div>
            </div>
            <div className={styles.capacitorMeterLabels} aria-hidden="true">
              {Array.from({ length: 7 }, (_, volt) => <span key={volt}>{volt}V</span>)}
            </div>
            <div className={styles.chargingStatusRow}>
              <span className={styles.chargingStatusLabel}>Status:</span>
              <span
                className={`${styles.chargingStatus} ${
                  capacitorReading.chargerConnected ? styles.charging : styles.discharging
                }`}
                aria-live="polite"
              >
                {capacitorReading.chargerConnected ? 'Charging' : 'Discharging'}
              </span>
            </div>
          </div>
          <div className={`${styles.panelBox} ${styles.stepsPanel}`} aria-label="Footstep pulses panel">
            <h2 className={styles.panelHeading}>Footstep Pulses</h2>
            <div className={styles.footstepContent} aria-live="polite">
              <svg
                className={styles.footstepIcon}
                viewBox="-41.24 -41.24 597.94 597.94"
                role="img"
                aria-label="Footstep"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M298.794 386.711c27.805 9.522 52.357 15.587 87.633 26.427C372.875 584.374 210.952 516.371 298.794 386.711zM443.366 229.409c-1.826-51.415-10.882-118.86-83.017-108.292-33.815 8.825-58.8 45.962-70.551 110.035-6.454 35.229-2.701 84.678 4.912 114.32 6.951 20.889 4.587 19.605 12.058 23.572 28.916 6.514 57.542 13.725 86.693 21.078C423.075 369.209 447.397 258.182 443.366 229.409zM220.752 225.463c7.607-29.646 11.36-79.095 4.909-114.32C213.919 47.067 188.931 9.924 155.11 1.105 82.975-9.463 73.919 57.981 72.093 109.399c-4.031 28.768 20.294 139.802 49.911 160.711 29.149-7.353 57.771-14.558 86.696-21.078 7.462-3.963 5.098-2.68 12.052-23.569zM129.029 293.132c13.547 171.234 175.47 103.231 87.63-26.427-27.805 9.523-52.355 15.587-87.63 26.427z"
                  fill="#008E8B"
                  stroke="#648290"
                  strokeWidth="1.03"
                />
              </svg>
              <p className={styles.footstepCount}>
                {footstepPulseCount.toLocaleString()}
              </p>
              <p className={styles.footstepCountLabel}>Total Steps</p>
            </div>
          </div>
            <div className={`${styles.panelBox} ${styles.totalPanel}`} aria-label="Total output panel">
              <h2 className={styles.panelHeading}>Total Output</h2>
              <div className={styles.totalMetrics}>
                <div className={styles.totalMetric}>
                  <p className={styles.totalMetricLabel}>Cumulative Energy (Wh)</p>
                  <p className={styles.totalMetricValue}>
                    <span>{totalOutput.cumulativeEnergyWh.toFixed(2)}</span>
                    <span className={styles.totalMetricUnit}>Wh</span>
                  </p>
                </div>
                <div className={styles.totalMetric}>
                  <p className={styles.totalMetricLabel}>Cumulative Power (W)</p>
                  <p className={styles.totalMetricValue}>
                    <span>{totalOutput.outputPowerW.toFixed(2)}</span>
                    <span className={styles.totalMetricUnit}>W</span>
                  </p>
                </div>
              </div>
            </div>
        </section>
      </BorderGlow>
    </main>  
  );
};


export default Dashboard;
