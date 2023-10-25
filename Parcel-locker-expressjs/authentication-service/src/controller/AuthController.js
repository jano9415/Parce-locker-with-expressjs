const userService = require("../service/UserService");

const authPelda = (req, res) => {
    userService.authPelda();
}

const login = (req, res) => {
    res.send(userService.login());
}

//Regisztráció
//Nem szükséges jwt token
const signUp = (req, res) => {

    userService.signUp(req, res);
}

const courierLogin = (req, res) => {
    res.send(userService.courierLogin());
}

const signUpActivation = (req, res) => {
    res.send(userService.signUpActivation());
}

const createCourier = (req, res) => {
    res.send(userService.createCourier());
}

const createAdmin = (req, res) => {
    res.send(userService.createAdmin());
}

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

