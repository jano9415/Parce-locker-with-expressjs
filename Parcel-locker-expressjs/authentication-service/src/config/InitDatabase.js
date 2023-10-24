const User = require("../model/User");
const Role = require("../model/Role");

const initRoles = () => {

    const role1 = {
        roleName: "courier"
    };
    Role.create(role1);

    const role2 = {
        roleName: "admin"
    };
    Role.create(role2);

    const role3 = {
        roleName: "user"
    };
    Role.create(role3);
}

module.exports = {
    initRoles,
};