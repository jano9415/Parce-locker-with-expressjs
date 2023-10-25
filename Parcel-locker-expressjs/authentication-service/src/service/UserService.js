const User = require("../model/User");
const Role = require("../model/Role");
const initDb = require("../config/InitDatabase");
const mongoose = require("mongoose");
const crypto = require("crypto");

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
//Jwt token generálása
//Nem szükséges jwt token
const login = (req, res) => {

}

//Regisztráció. Új felhasználó hozzáadása
//DTO objektum küldése apache kafkának
//DTO objektum küldése a parcel handler service-nek
const signUp = (req, res) => {

    const requestBody = req.body;

    //A megadott email cím már létezik
    User.findOne({ emailAddress: requestBody.emailAddress })
        .then(user => {
            if (user) {
                const stringResponse = {
                    message: "emailExists"
                }
                res.status(200).json(stringResponse);
            }
        })
        .catch(error => {

        })



    //Új felhasználó létrehozása
    const user = new User({
        emailAddress: requestBody.emailAddress,
        password: sha256Password(requestBody.password),
        activationCode: generateRandomString(8)
    });




}

//Futár bejelentkezése az automatánál
//Nem szükséges jwt token
const courierLogin = (req, res) => {

}

//Regisztráció aktiválása
//Nem szükséges jwt token
const signUpActivation = (req, res) => {

}

//Új futár létrehozása
//Jwt token szükséges
//Admin szerepkör szükséges
const createCourier = (req, res) => {
    res.send(userService.createCourier());
}

//Új admin létrehozása
//Jwt token szükséges
//Admin szerepkör szükséges
const createAdmin = (req, res) => {
    res.send(userService.createAdmin());
}

//Futár valamely adatának módosítása
//A kérés a parcel handler service-ből jön
const updateCourier = (req, res) => {
    res.send(userService.updateCourier());
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