const express = require("express");
const app = express();
const { sequelize, ConexionBD} = require("./config/database.js")

app.use(express.json());

ConexionBD().then(() => {
    app.listen(3000, () => {
        console.log("Escuchando en el puerto 3000...")
    });
});