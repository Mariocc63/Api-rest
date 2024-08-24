const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController.js");

router.post("/productos",ProductosController.crearProductos);
router.put("/productos/:idproductos",ProductosController.actualizarProductos)
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;