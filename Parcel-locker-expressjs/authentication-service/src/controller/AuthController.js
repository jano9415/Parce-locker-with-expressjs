const userService = require("../service/UserService");

const authPelda = (req,res) => {
    userService.authPelda();
}

module.exports = {
    authPelda,
};

