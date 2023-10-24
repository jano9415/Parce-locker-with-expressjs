const User = require("../model/User");
const Role = require("../model/Role");
const initDb = require("../config/InitDatabase");
const mongoose = require("mongoose");



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

module.exports = {
    authPelda,
};