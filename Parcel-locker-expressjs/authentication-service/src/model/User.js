const mongoose = require("mongoose");

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

        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
    }
);

const User = mongoose.model("User", userScheme);

module.exports = User;