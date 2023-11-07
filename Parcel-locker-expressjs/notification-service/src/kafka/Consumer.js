const { Kafka } = require("kafkajs");
const emailService = require("../service/EmailService");

const kafka = new Kafka({
    clientId: 'parcel-locker',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-service' });

const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'signup_email_topic', fromBeginning: true });
    await consumer.subscribe({ topic: 'parcelSendingNotification', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            //Regisztrációs kód küldése email-ben
            if (topic === 'signup_email_topic') {
                const stringMessage = message.value.toString();
                const signUpActivation = JSON.parse(stringMessage);
                emailService.sendSignUpActivationCode(signUpActivation);
            }
            //Email küldése a feladónak és a címzettnek csomagfeladás után
            if (topic === 'parcelSendingNotification') {
                const stringMessage = message.value.toString();
                const notification = JSON.parse(stringMessage);
                emailService.parcelSendingNotificationForSender(notification);
                emailService.parcelSendingNotificationForReceiver(notification);
            }

        },
    });
}

runConsumer().catch(console.error);


module.exports = {
    runConsumer,
};