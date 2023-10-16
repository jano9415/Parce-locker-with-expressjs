const express = require("express");
const parcelRoute = require("./src/route/ParcelRoute");
const { sequelize } = require("./src/sequelize/models");

const app = express();
const port = 8081;

app.use(express.json());


app.use("/parcelhandler/parcel", parcelRoute);

sequelize.sync();

app.listen(port, () => console.log('app listening on port ' + port));