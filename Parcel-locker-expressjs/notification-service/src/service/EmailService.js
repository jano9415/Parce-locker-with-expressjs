const nodeMailer = require("nodemailer");

//Config
const transporter = nodeMailer.createTransport({
    service: 'Gmail', // E-mail szolgáltató neve
    auth: {
        user: 'packetswift@gmail.com', // Küldő email cím
        pass: 'trimrffthfeimykl' //Alkalmazásjelszó
    }
});

//Regisztrációs kód küldése email-ben
const sendSignUpActivationCode = (signUpActivation) => {

    //E-mail küldési beállítások
    const mailOptions = {
        from: 'packetswift@gmail.com', // Küldő email cím
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

module.exports = {
    sendSignUpActivationCode,
};