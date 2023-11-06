const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "parcel-locker",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();


//Email küldése a feladónak és az átvevőnek csomagfeladás után
//Értesítési objektum küldése a(z) ("parcelSendingNotification") topicnak
async function parcelSendingNotification(notification) {

    await producer.connect();
    await producer.send({
        topic: 'parcelSendingNotification',
        messages: [{ value: JSON.stringify(notification) }],
    });

    await producer.disconnect();
}


module.exports = {
    parcelSendingNotification,
};
