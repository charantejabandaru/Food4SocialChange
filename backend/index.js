const dotenv = require("dotenv");
const cors = require('cors');
const express = require("express");
var bodyparser = require("body-parser");
const configdb = require("./config/configdb");

const app = express();

dotenv.config({path: "./config/.env"});
configdb();

app.use(cors({
    origin: '*'
}));
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(require("./controllers/user"));

app.listen(3000,() => {
        console.log("server is running on port 3000");
});
