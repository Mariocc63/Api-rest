const express = require("express");
const app = express();
const {ConexionBD} = require("./config/database.js")

const estadoRoutes = require("./routes/EstadoRoute.js")
const usuarioRoutes = require("./routes/UsuarioRoute.js")

app.use(express.json());
app.use("/api", estadoRoutes)
app.use("/api", usuarioRoutes)

ConexionBD().then(() => {
    app.listen(3000, () => {
        console.log("Escuchando en el puerto 3000...")
    });
});