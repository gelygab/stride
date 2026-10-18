import dotenv from 'dotenv';
const mqtt = require('mqtt');
const express = require('express');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

let mqttClient;

const mqttHost = process.env.MQTTHOST;
const protocol = process.env.MQTTPROTOCOL || 'mqtt';
const port = process.env.MQTTPORT || '1883';

const SENSOR_TOPIC = process.env.SENSOR_TOPIC;

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

    mqttClient.on("message", (topic, message) => {
        console.log(
            "Received Message: " + message.toString() + "\nOn topic: " + topic
        );
    });
}

connectToBroker();

app.listen(3001, () => {
    console.log(`Server running on port ${PORT}.`);
});

