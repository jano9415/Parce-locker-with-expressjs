const mongoose = require("mongoose");
const Role = require("../model/Role");

const userScheme = mongoose.Schema(
    {

        emailAddress: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        enable: {
            type: Boolean,
            required: true,
            default: false
        },

        activationCode: {
            type: String
        },

        //Így csak a role id-ja lesz eltárolva
        //roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
        //Így viszont az egész role objektum
        roles: [Role.schema],
        //Így pedig meg lehet azt csinálni, hogy a Role-t nem tárolom az adatbázisban
        /*
        roles: [
            {
                name: String,
                // Egyéb role mezők
            }
        ],
        */
    }
);

const User = mongoose.model("User", userScheme);

module.exports = User;