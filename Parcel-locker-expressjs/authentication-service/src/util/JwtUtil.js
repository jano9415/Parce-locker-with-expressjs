const jwt = require("jsonwebtoken");

//Jwt token titkosítása
const jwtSecret = "secretkey";

//Token generálása
//Email cím elhelyezése a token subject mezőjében
//Szerepkörök elhelyezése a token body részében, azon belül a claim részben
const generateToken = (emailAddress, roles) => {


    const payload = {};

    //Felhasználó email cím átadása a jwt tokennek. Ez a subject
    //Jwt token body része
    payload.sub = emailAddress
    //Felhasználó szerepköreinek átadása a jwt tokennek
    //Jwt token body része
    //Bármennyi objektumot, változót át lehet neki adni a 'claim' részben
    payload.roles = roles;

    //Token összeállítása
    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1h'});
    return token;

}

module.exports = {
    generateToken,
};

