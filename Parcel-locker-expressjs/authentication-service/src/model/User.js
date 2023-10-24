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

        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
    }
);

const User = mongoose.model("User", userScheme);

module.exports = User;