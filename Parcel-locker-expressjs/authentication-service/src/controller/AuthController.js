const userService = require("../service/UserService");
const User = require("../model/User");
const Role = require("../model/Role");

const authPelda = (req, res) => {
    userService.authPelda();
}

//Bejelentkezés
//Jwt token generálása
//Nem szükséges jwt token
const login = (req, res) => {
    userService.login(req, res);
}

//Regisztráció
//Nem szükséges jwt token
const signUp = (req, res) => {
    userService.signUp(req, res);
}

//Futár bejelentkezése az automatánál
//Nem szükséges jwt token
const courierLogin = (req, res) => {
    userService.courierLogin(req, res);
}

//Regisztráció aktiválása
//Nem szükséges jwt token
const signUpActivation = (req, res) => {
    userService.signUpActivation(req, res);
}

//Új futár létrehozása
//Jwt token szükséges
//Admin szerepkör szükséges
const createCourier = (req, res) => {
    userService.createCourier(req, res);
}

//Új admin létrehozása
//Jwt token szükséges
//Admin szerepkör szükséges
const createAdmin = (req, res) => {
    userService.createAdmin(req, res);
}

//Futár valamely adatának módosítása
//A kérés a parcel handler service-ből jön
const updateCourier = (req, res) => {
    userService.updateCourier(req, res);
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

