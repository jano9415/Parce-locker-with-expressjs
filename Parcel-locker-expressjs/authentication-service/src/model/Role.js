const mongoose = require("mongoose");

const roleScheme = mongoose.Schema(

    {
        roleName: {
            type: String,
            required: true,
            //unique: true,
        }
    }


);

const Role = mongoose.model("Role", roleScheme);

module.exports = Role;