const express = require("express");
const parcelRoute = require("./src/route/ParcelRoute");
const parcelLockerRoute = require("./src/route/ParcelLockerRoute");
const courierRoute = require("./src/route/CourierRoute");
const { sequelize, Courier, Parcel } = require("./src/sequelize/models");
const userRoute = require("./src/route/UserRoute");
const initDb = require("./src/config/InitDatabase");
const storeRoute = require("./src/route/StoreRoute");

const app = express();
const port = 8081;

app.use(express.json());


app.use("/parcelhandler/parcel", parcelRoute);
app.use("/parcelhandler/parcellocker", parcelLockerRoute);
app.use("/parcelhandler/user", userRoute);
app.use("/parcelhandler/courier", courierRoute)
app.use("/parcelhandler/store", storeRoute);

//sequelize.sync();
//initDb.initAddress();
//initDb.initBoxes();
//initDb.initStores();
//initDb.initParcelLockers();




app.listen(port, () => console.log('app listening on port ' + port));