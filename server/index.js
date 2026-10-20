import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mqtt from 'mqtt';

const PORT = process.env.PORT;

let mqttClient;

const mqttHost = process.env.MQTTHOST;
const protocol = process.env.MQTTPROTOCOL || 'mqtt';
const port = process.env.MQTTPORT || '1883';

const SENSOR_TOPIC = process.env.SENSOR_TOPIC;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: [
            "GET",
            "POST"
        ]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
})


function connectToBroker() {
    const clientId = "client" + Math.random().toString(36).substring(7);
    const hostUrl = `${protocol}://${mqttHost}:${port}`;

    const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
    };

    mqttClient = mqtt.connect(hostUrl, options);

    mqttClient.on("error", (err) => {
        console.log("MQTT Error: ", err);
        mqttClient.end();
    });

    mqttClient.on("reconnect", () => {
        console.log("Reconnecting to MQTT Broker...");
    });

    mqttClient.on("connect", () => {
        console.log("MQTT Client connected: ", clientId);

        mqttClient.subscribe(SENSOR_TOPIC, { qos: 0 }, (err) => {
            if (!err) {
                console.log(`Successfully subscribed to ${SENSOR_TOPIC}`);
            } else {
                console.log("Subscription failed: ", err);
            }
        });
    });

    const latestTelemetry = {
        voltage: 0,
        current: 0,
        power: 0,
        energy: 0,
    };

    mqttClient.on("message", (topic, message) => {
        try {
            const rawString = message.toString();
            let parsedVal = parseFloat(rawString);

            if (topic.includes("load_voltage") || topic.includes("voltage")) {
                if(!isNaN(parsedVal)) latestTelemetry.voltage = parsedVal;
            } else if (topic.includes("current")) {
                if (!isNaN(parsedVal)) latestTelemetry.current = parsedVal;
            } else if (topic.includes("power")) {
                if (!isNaN(parsedVal)) latestTelemetry.power = parsedVal;
            } else if (topic.includes("energy")) {
                if (!isNaN(parsedVal)) latestTelemetry.energy = parsedVal;
            } else if (rawString.startsWith("{") && rawString.endsWith("}")) {
               const JSONdata = JSON.parse(rawString);
               latestTelemetry.voltage = Number(JSONdata.voltage || JSONdata.loadVoltage || JSONdata.load_voltage || 0);
               latestTelemetry.current = Number(JSONdata.current || JSONdata.current_mA || 0);
               latestTelemetry.power = Number(JSONdata.power || JSONdata.power_W || 0);
               latestTelemetry.energy = Number(JSONdata.energy || JSONdata.energy_Wh || 0);
            }
            
            io.emit("telemetry_data", latestTelemetry);
        } catch (err) {
            console.error('Failed to parse incoming telemetry JSON: ', err);
        }
    });
}

connectToBroker();

server.listen(3001, () => {
    console.log(`Server running on port ${PORT}.`);
});

