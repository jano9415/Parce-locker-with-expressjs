const express = require("express");
const app = express();
const port = 8083;
const consumer = require("./src/kafka/Consumer");



app.listen(port, () => console.log('app listening on port ' + port));