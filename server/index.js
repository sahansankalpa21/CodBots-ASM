const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const mainRoute = require("./routes/main");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/main", mainRoute);

module.exports = app;
