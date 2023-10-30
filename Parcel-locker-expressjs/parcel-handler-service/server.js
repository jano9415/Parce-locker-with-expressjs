const express = require("express");
const parcelRoute = require("./src/route/ParcelRoute");
const parcelLockerRoute = require("./src/route/ParcelLockerRoute");
const { sequelize, Courier, Parcel } = require("./src/sequelize/models");
const userRoute = require("./src/route/UserRoute");
const initDb = require("./src/config/InitDatabase");

const app = express();
const port = 8081;

app.use(express.json());


app.use("/parcelhandler/parcel", parcelRoute);
app.use("/parcelhandler/parcellocker", parcelLockerRoute);
app.use("/parcelhandler/user", userRoute);

//sequelize.sync();
//initDb.initAddress();
//initDb.initBoxes();




app.listen(port, () => console.log('app listening on port ' + port));