const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController.js");
const {autenticarToken} = require("../middleware.js")

router.post("/productos", autenticarToken, ProductosController.crearProductos);
router.put("/productos/:idproductos", autenticarToken, ProductosController.actualizarProductos)
router.get("/verproductos/", autenticarToken, ProductosController.verProductosActivos)
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;