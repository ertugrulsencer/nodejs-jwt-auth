const express = require("express");
const router = require("./router/auth");
const app = require("express")();

app.use(express.json({ extended: false }));

/* Router Middlewares */
app.use("/auth", router);

app.listen(5000, () => console.log("Server running"));
