const User = require("../model/User");
const Role = require("../model/Role");
const initDb = require("../config/InitDatabase");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwtUtil = require("../util/JwtUtil");
const { use } = require("../route/AuthRoute");
const producer = require("../kafka/Producer");

//SHA-256 kódolás
const sha256Password = (password) => {

    // Hash létrehozása
    const hash = crypto.createHash('sha256');
    hash.update(password);

    // Az elkészített hash hexadecimális formában
    const hashHex = hash.digest('hex');
    return hashHex;
}

//Random string generálása
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}



const authPelda = () => {
    //initDb.initRoles();

    /*
    const role1 = new Role({
        roleName: "lacivagyok"
    });

    role1.save()
        .then(savedRole => {
            console.log('Role elmentve:', savedRole);
        })
        .catch(error => {
            console.error('Hiba történt a mentés során:', error);
        });
        */

    /*
Role.find()
    .then(roles => {
        console.log('Minden Role objektum:', roles);
    })
    .catch(error => {
        console.error('Hiba történt a lekérdezés során:', error);
    });
    */


    /*
    Role.findOne({ roleName: "user" })
        .then(role => {
            if (role) {
                console.log('Talált Role objektum:', role);

                const user1 = new User({
                    emailAddress: "lacika@gmail.com",
                    password: "lacipass",
                    roles: [role]
                });
                user1.save();

            } else {
                console.log('Nincs ilyen Role objektum a megadott roleName-nal.');
            }
        })
        .catch(error => {
            console.error('Hiba történt a lekérdezés során:', error);
        });
        */

    /*
    const user1 = new User({
        emailAddress: "fdferer",
        password: "pass"
    });
    //user1.roles.push(Role.findById("6537c9d6848fd7fa343a9402"));
    User.create(user1);
    */



}

//Bejelentkezés
//Sikeres bejelentkezés esetén visszatérés egy LoginResponse objektummal
//A LoginResponse objektum tartalmazza: - user id, token típusa, token, email cím, szerepkörök
const login = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};
    const loginResponse = {};

    User.findOne({ emailAddress: requestBody.emailAddress })
        .then(user => {

            if (user) {

                const sha256Pass = sha256Password(requestBody.password);
                if (user.password !== sha256Pass) {
                    stringResponse.message = "passwordError";
                    res.status(200).json(stringResponse);
                }

                if (user.enable === false) {
                    stringResponse.message = "notActivated";
                    res.status(200).json(stringResponse);
                }

                const stringRoles = user.roles.map(role => role.roleName);
                const jwtToken = jwtUtil.generateToken(user.emailAddress, stringRoles);
                loginResponse.id = user.id;
                loginResponse.emailAddress = user.emailAddress;
                loginResponse.token = jwtToken;
                loginResponse.roles = user.roles.map(role => role.roleName);
                res.status(200).json(loginResponse);

            }
            else {
                stringResponse.message = "emailError";
                res.status(200).json(stringResponse);
            }
        })
        .catch(error => {

        })

}

//Regisztráció. Új felhasználó hozzáadása
//DTO objektum küldése apache kafkának
//DTO objektum küldése a parcel handler service-nek
const signUp = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    User.findOne({ emailAddress: requestBody.emailAddress })
        .then(user => {
            //A megadott email cím már létezik
            if (user) {

                stringResponse.message = "emailExists";
                res.status(200).json(stringResponse);
            }
            //Új felhasználó létrehozása
            else {

                Role.findOne({ roleName: "user" })
                    .then(role => {
                        if (role) {
                            const user = new User({
                                emailAddress: requestBody.emailAddress,
                                password: sha256Password(requestBody.password),
                                activationCode: generateRandomString(8),
                                roles: [role]
                            });
                            user.save();

                            stringResponse.message = "successRegistration";

                            //Új ParcelHandlerServiceUserDTO objektum létrehozása
                            //Ezt az objektumot küldöm a parcel handler service-nek
                            /*--------------------*/

                            //SignUpActivationDTO objektum létrehozása majd küldése az apache kafka topicnak
                            //A topic neve: "signup_email_topic"
                            //Regisztráció megerősítéséhez szükséges kód küldése email-ben
                            /*--------------------*/
                            const signUpActivation = {
                                lastName: requestBody.lastName,
                                firstName: requestBody.firstName,
                                activationCode: user.activationCode,
                                emailAddress: requestBody.emailAddress
                            };

                            producer.sendSignUpActivationCode(signUpActivation)
                                .then(() => {
                                    console.log("üzenet elküldve");
                                })
                                .catch(error => {
                                    console.log("hiba");
                                })

                            //ParcelHandlerServiceUserDTO objektum küldése a parcel-handler service-nek
                            //Ez a user objektum máshogy néz ki, mint az authentication-service user objektuma
                            //Szinkron kommunikáció. "/parcelhandler/user/createuser" végpont meghívása a parcel handler service-ben.
                            /*--------------------*/


                            res.status(200).json(stringResponse);

                        }
                    })
                    .catch(error => {

                    });

            }
        })
        .catch(error => {

        })
}

//Futár bejelentkezés rfid kártyával az automatánál
//Csak jelszó érkezik a kérésbe
//Futár keresése jelszó szerint
//Sikeres bejelentkezés esetén visszatérés egy loginResponse objektummal
//Ez az objektum tartalmazza: jwt token (ami tartalmazza a futár egyedi azonosítóját), id,
// egyedi azonosító újra (ez nem biztos, hogy kelleni fog) és a szerepkörök
const courierLogin = (req, res) => {

    const requestBody = req.body;
    const parcelLockerId = req.params.parcelLockerId;
    const stringResponse = {};
    const loginResponse = {};

    const sha256Pass = sha256Password(requestBody.password);

    User.findOne({ password: sha256Pass })
        .then(user => {

            if (user) {

                //Kérés küldése a parcel-handler-service-nek
                //Ha a kérésben érkező automata store id és a futár store id nem egyezik meg,
                //akkor a futár nem jogosult bejelentekzni ahhoz az automatához
                const responseFromParcelHandlerService = {};
                /*--------------------*/

                //Ha nem jogosult a futár a bejelentkezésre
                if (responseFromParcelHandlerService.message === "notEligible") {
                    stringResponse.message = "notEligible";
                    res.status(200).json(stringResponse);
                }

                const stringRoles = user.roles.map(role => role.roleName);
                const jwtToken = jwtUtil.generateToken(user.emailAddress, stringRoles);
                loginResponse.id = user.id;
                loginResponse.emailAddress = user.emailAddress;
                loginResponse.token = jwtToken;
                loginResponse.roles = user.roles.map(role => role.roleName);
                res.status(200).json(loginResponse);


            }
            else {
                stringResponse.message = "notFound";
                res.status(200).json(stringResponse);
            }
        })
        .catch(error => {

        })

}


//Regisztráció aktiválása
//Keresés aktivációs kód szerint
//Aktivációs kód null-ra állítása
//Enable mező true-ra állítása
const signUpActivation = (req, res) => {

    const signUpActivationCode = req.params.signUpActivationCode;
    const stringResponse = {};


    User.findOne({ activationCode: signUpActivationCode })
        .then(user => {

            if (user) {

                user.activationCode = null;
                user.enable = true;
                user.save();

                stringResponse.message = "successfulActivation";
                res.status(200).json(stringResponse);
            }
            else {
                stringResponse.message = "unSuccessfulActivation";
                res.status(200).json(stringResponse);
            }

        })
        .catch(error => {

        })


}


//Új futár létrehozása
//Futár objektum küldése a parcel handler service-nek
const createCourier = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    User.findOne({ emailAddress: req.emailAddress })
        .then(user => {

            //A megadott futár azonosító már létezik
            if (user) {
                stringResponse.message = "uidExists";
                res.status(200).json(stringResponse);
            }
            else {
                //Futár esetén a jelszót is ellenőrizni kell. Kettő ugyan olyan nem lehet, mert a jelszó egyben a bejelentkezési
                //RFID azonosító is
                const sha256Pass = sha256Password(requestBody.password);
                User.findOne({ password: sha256Pass })
                    .then(user => {
                        if (user) {
                            stringResponse.message = "passwordExists";
                            res.status(200).json(stringResponse);
                        }
                        else {
                            //Új futár létrehozása
                            Role.findOne({ roleName: "courier" })
                                .then(role => {
                                    const newCourier = new User({
                                        emailAddress: requestBody.emailAddress,
                                        password: requestBody.password,
                                        enable: true,
                                        roles: [role]
                                    });
                                    newCourier.save();

                                    //CourierDTO objektum létrehozása. Ezt az objektumot küldöm a parcel-handler service-nek.
                                    //Ez az objektum már nem tartalmaz jelszót, viszont tartalmaz vezeték és kereszt nevet és store id-t
                                    /*----------------*/

                                    //Futár küldése a parcel handler service-nek
                                    /*---------------*/

                                    stringResponse.message("successCourierCreation");
                                    res.status(200).json(stringResponse);
                                })
                                .catch(error => {

                                })

                        }

                    })
                    .catch(error => {

                    })

            }
        })
        .catch(error => {

        })
}

//Új admin létrehozása
const createAdmin = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    User.findOne({ emailAddress: requestBody.emailAddress })
        .then(user => {
            //A megadott email cím már létezik
            if (user) {
                stringResponse.message = "emailExists";
                res.status(200).json(stringResponse);
            }
            //Új admin létrehozása
            else {
                const sha256Pass = sha256Password(requestBody.password);
                Role.findOne({ roleName: "admin" })
                    .then(role => {
                        const newAdmin = new User({
                            enable: true,
                            emailAddress: requestBody.emailAddress,
                            password: sha256Pass,
                            roles: [role]
                        });
                        newAdmin.save();

                        stringResponse.message = "successAdminCreation";
                        res.status(200).json(stringResponse);
                    })
                    .catch(error => {

                    })


            }

        })
        .catch(error => {

        })
}

//Futár valamely adatának módosítása
//A kérés a parcel handler service-ből jön
//A parcel handler service-ben tranzakció kezelés van. Ha itt nem sikerül módosítani az adatokat az adatbázisban,
//akkor a parcel handler adatbázisból is visszavonjuk a módosításokat
const updateCourier = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    //User keresése a régi email cím (egyedi futár azonosító) alapján
    User.findOne({ emailAddress: requestBody.previousUniqueCourierId })
        .then(userForModify => {
            if (userForModify) {
                //A megadott egyedi futár azonosító már létezik az adatbázisban, vizsgálat
                //Azt is meg kell nézni, hogy a régi és az új futár azonosító megegyezik-e
                //Mert ha megegyezik, akkor mindig már létezik az adatbázisban hibát fog visszaküldeni
                User.findOne({ emailAddress: requestBody.newUniqueCourierId })
                    .then(user => {
                        if (user && requestBody.previousUniqueCourierId !== requestBody.newUniqueCourierId) {
                            stringResponse.message = "uidExists";
                            res.status(200).json(stringResponse);
                        }
                        else {
                            //Előfordulhat, hogy a jelszó (rfid azonosító) üres, mert azt nem akarja az admin módosítani
                            //A régi pedig nem fog érkezni a kérésben, mert azt nem jelenítem meg a frontenden
                            //Nem is tudnám, az sha256 kódolás miatt
                            if (requestBody.password !== null) {
                                const sha256Pass = sha256Password(requestBody.password);

                                //Futár esetén a jelszót is ellenőrizni kell. Kettő ugyan olyan nem lehet, mert a jelszó egyben a bejelentkezési
                                //RFID azonosító is
                                User.findOne({ password: sha256Pass })
                                    .then(user => {
                                        if (user) {
                                            stringResponse.message = "passwordExists";
                                            res.status(200).json(stringResponse);
                                        }
                                        else {
                                            //Futár új jelszava (rfid azonosítója)
                                            userForModify.password = sha256Pass;
                                            //Új email cím (egyedi futár azonosító)
                                            userForModify.emailAddress = requestBody.newUniqueCourierId;
                                            userForModify.save();
                                            stringResponse.message = "successfulUpdating";
                                            res.status(200).json(stringResponse);

                                        }

                                    })
                                    .catch(error => {

                                    })
                            }

                        }

                    })
                    .catch(error => {

                    })

            }
            //Nem valószínű, mert a frontenden megjelenítem a futárokat és abból választ ki az admin
            else {
                stringResponse.message = "notFound";
                res.status(200).json(stringResponse);

            }

        })
        .catch(error => {

        })
}

module.exports = {
    authPelda,
    login,
    signUp,
    courierLogin,
    signUpActivation,
    createCourier,
    createAdmin,
    updateCourier

};