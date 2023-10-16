const express = require("express");
const app = express();
const port = 8082;

app.listen(port, () => console.log('app listening on port ' + port));