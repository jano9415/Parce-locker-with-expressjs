const express = require("express");
require("./src/config/DbConfig");
const User = require("./src/model/User");
const authRoute = require("./src/route/AuthRoute");


const app = express();
const port = 8082;

app.use(express.json());

app.use("/auth", authRoute);

const user1 = {
    emailAddress: "valami@gmail.com"
}

try{
    User.create(user1);
}
catch (error){
    console.log(error.message);
}

app.listen(port, () => console.log('app listening on port ' + port));

