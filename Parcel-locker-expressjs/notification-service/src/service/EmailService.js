const nodeMailer = require("nodemailer");

//Config
const transporter = nodeMailer.createTransport({
    service: 'Gmail', // E-mail szolgáltató neve
    auth: {
        user: '', // Küldő email cím
        pass: '' //Alkalmazásjelszó
    }
});

//Regisztrációs kód küldése email-ben
const sendSignUpActivationCode = (signUpActivation) => {

    //E-mail küldési beállítások
    const mailOptions = {
        from: '', // Küldő email cím
        to: signUpActivation.emailAddress, // Címzett e-mail cím
        subject: "Regisztráció aktiválása", // E-mail tárgya
        text:
            "Kedves " + signUpActivation.lastName + " " + signUpActivation.firstName + "\n\n"
            + "Köszönjük hogy regisztrált a Swiftpost csomagküldő rendszerben.\n"
            + "A regisztráció véglegesítéséhez kattintson az alábbi linkre.\n"
            + "http://192.168.0.13:3000/login/" + signUpActivation.activationCode
            + ""
    };

    //Email küldése
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Hiba történt: ' + error);
        } else {
            console.log('E-mail elküldve: ' + info.response);
        }
    });

}

//Email küldése a feladónak csomagfeladás után
const parcelSendingNotificationForSender = (notification) => {

    //E-mail küldési beállítások
    const mailOptions = {
        from: '', // Küldő email cím
        to: notification.senderEmailAddress, // Címzett e-mail cím
        subject: "Csomagfeladás", // E-mail tárgya
        text:
            "Kedves " + notification.senderName + "\n\n"
            + "Ön " + notification.sendingDate + " " + notification.sendingTime + "-kor " +
            "sikeresen feladta a(z) " + notification.uniqueParcelId + " azonosítójú csomagját.\n"
            + "A csomag ára: " + notification.price + " Ft.\n"
            + "A csomag címzettje: " + notification.receiverName + "\n"
            + "A feladás helye: " + notification.senderParcelLockerPostCode + " " + notification.senderParcelLockerCity
            + " " + notification.senderParcelLockerStreet + "\n"
            + "Az érkezés helye: " + notification.receiverParcelLockerPostCode + " " + notification.receiverParcelLockerCity
            + " " + notification.receiverParcelLockerStreet + "\n"
            + "Ha a feladott csomagja megérkezik a kiválasztott automatába, újabb értesítést fogunk küldeni."
    };

    //Email küldése
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Hiba történt: ' + error);
        } else {
            console.log('E-mail elküldve: ' + info.response);
        }
    });

}

//Email küldése a címzettnek csomagfeladás után
const parcelSendingNotificationForReceiver = (notification) => {

    //E-mail küldési beállítások
    const mailOptions = {
        from: '', // Küldő email cím
        to: notification.receiverEmailAddress, // Címzett e-mail cím
        subject: "Csomagfeladás", // E-mail tárgya
        text:
            "Kedves " + notification.receiverName + "\n\n"
            + "Önnek " + notification.sendingDate + " " + notification.sendingTime + "-kor " +
            notification.uniqueParcelId + " csomagazonosítóval csomagot adtak fel.\n"
            + "A csomag ára: " + notification.price + " Ft.\n"
            + "A csomag feladója: " + notification.senderName + "\n"
            + "A feladás helye: " + notification.senderParcelLockerPostCode + " " + notification.senderParcelLockerCity
            + " " + notification.senderParcelLockerStreet + "\n"
            + "Az érkezés helye: " + notification.receiverParcelLockerPostCode + " " + notification.receiverParcelLockerCity
            + " " + notification.receiverParcelLockerStreet + "\n"
            + "Ha a feladott csomag megérkezik a kiválasztott automatába, újabb értesítést fogunk küldeni," +
            " amiben megtalálja az átvételhez szükséges nyitókódot."
    };

    //Email küldése
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Hiba történt: ' + error);
        } else {
            console.log('E-mail elküldve: ' + info.response);
        }
    });

}

module.exports = {
    sendSignUpActivationCode,
    parcelSendingNotificationForSender,
    parcelSendingNotificationForReceiver,
};