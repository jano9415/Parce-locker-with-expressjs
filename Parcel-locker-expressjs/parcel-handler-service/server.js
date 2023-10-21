const express = require("express");
const parcelRoute = require("./src/route/ParcelRoute");
const parcelLockerRoute = require("./src/route/ParcelLockerRoute");
const { sequelize, Courier, Parcel } = require("./src/sequelize/models");

const app = express();
const port = 8081;

app.use(express.json());


app.use("/parcelhandler/parcel", parcelRoute);
app.use("/parcelhandler/parcellocker", parcelLockerRoute);

//sequelize.sync();




app.listen(port, () => console.log('app listening on port ' + port));