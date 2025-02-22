/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: app.js

    Last Modified: 22/01/2024
*/

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);

app.use("/", express.static("public"));

module.exports = app;
