const { User, sequelize } = require("../sequelize/models");

//Új user hozzáadása az adatbázishoz. A user objektum az authentication service-től érkezik szinkron kommunikációval.
const createUser = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    User.create({
        emailAddress: requestBody.emailAddress,
        lastName: requestBody.lastName,
        firstName: requestBody.firstName,
        phoneNumber: requestBody.phoneNumber
    })
        .then(user => {
            console.log("hozzáadva");
        })
        .catch(error => {
            console.log("hiba");
        })

    stringResponse.message = "userCreated";
    res.status(200).json(stringResponse);

}

module.exports = {
    createUser
};