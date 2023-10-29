const express = require("express");
require("./src/config/DbConfig");
const User = require("./src/model/User");
const authRoute = require("./src/route/AuthRoute");

const app = express();
const port = 8082;

app.use(express.json());

app.use("/auth", authRoute);



app.listen(port, () => console.log('app listening on port ' + port));

