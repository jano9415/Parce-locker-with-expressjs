const express = require("express");
const app = express();
const port = 8084;

app.listen(port, () => console.log('app listening on port ' + port));