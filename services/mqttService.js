import mqtt from "mqtt";

export default function sendMessageToTopic(topic, jsonData) {
  // MQTT broker connection URL
  const brokerUrl = "mqtt://broker.hivemq.com:1883";

  // Connect to the MQTT broker
  const client = mqtt.connect(brokerUrl);

  // Handle connection events
  client.on("connect", () => {
    console.log("Connected to MQTT broker");

    // Publish JSON data to the topic
    client.publish(topic, JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error("Error publishing message:", err);
      } else {
        console.log("Message published successfully");
        client.end(); // End the connection after publishing
      }
    });
  });
}
