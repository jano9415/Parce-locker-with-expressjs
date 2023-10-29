const { Kafka } = require("kafkajs");
const emailService = require("../service/EmailService");

const kafka = new Kafka({
    clientId: 'parcel-locker',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-service' });

async function runConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'signup_email_topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const stringMessage = message.value.toString();
            const signUpActivation = JSON.parse(stringMessage);
            emailService.sendSignUpActivationCode(signUpActivation);
        },
    });
}

runConsumer().catch(console.error);

module.exports = {
    runConsumer
};