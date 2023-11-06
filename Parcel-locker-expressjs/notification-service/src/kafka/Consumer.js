const { Kafka } = require("kafkajs");
const emailService = require("../service/EmailService");

const kafka = new Kafka({
    clientId: 'parcel-locker',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-service' });

//Regisztrációs kód küldése email-ben
async function sendSignUpActivationCode() {
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

sendSignUpActivationCode().catch(console.error);

//Email küldése a feladónak és a címzettnek csomagfeladás után
async function parcelSendingNotification() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'parcelSendingNotification', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const stringMessage = message.value.toString();
            const notification = JSON.parse(stringMessage);
            emailService.parcelSendingNotificationForSender(notification);
            emailService.parcelSendingNotificationForReceiver(notification);
        },
    });
}

parcelSendingNotification().catch(console.error);


module.exports = {
    sendSignUpActivationCode,
    parcelSendingNotification,
};