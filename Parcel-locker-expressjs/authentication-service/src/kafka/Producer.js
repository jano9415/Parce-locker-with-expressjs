const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "parcel-locker",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();


async function sendSignUpActivationCode(signUpActivation) {

    await producer.connect();
    await producer.send({
        topic: 'signup_email_topic',
        messages: [{ value: JSON.stringify(signUpActivation) }],
    });

    await producer.disconnect();
}

module.exports = {
    sendSignUpActivationCode,
};



