const express = require("express");
const app = express();
const {ConexionBD} = require("./config/database.js")

const estadoRoutes = require("./routes/EstadoRoute.js")
const usuarioRoutes = require("./routes/UsuarioRoute.js")
const categoriaproductosRoutes = require("./routes/CategoriaProductosRoute.js")
const productosRoutes = require("./routes/ProductosRoute.js")
const ordenRoutes = require("./routes/OrdenRoute.js")

app.use(express.json());
app.use("/api", estadoRoutes)
app.use("/api", usuarioRoutes)
app.use("/api", categoriaproductosRoutes)
app.use("/api", productosRoutes)
app.use("/api", ordenRoutes)

ConexionBD().then(() => {
    app.listen(3000, () => {
        console.log("Escuchando en el puerto 3000...")
    });
});