const mongoose = require("mongoose");

const userScheme = mongoose.Schema(

    {
        emailAddress: {
            type: String,
            required: true
        }
    }


);

const User = mongoose.model("User", userScheme);

module.exports = User;