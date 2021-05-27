require("dotenv").config();
const express = require("express");
const app = require("express")();

app.use(express.json({ extended: false }));

app.listen(5000, () => console.log("Server running"));
