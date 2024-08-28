const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController.js");
const {autenticarToken, verificarRol} = require("../middleware.js")

router.post("/productos", autenticarToken, verificarRol(1), ProductosController.crearProductos);
router.put("/productos/:idproductos", autenticarToken, verificarRol(1), ProductosController.actualizarProductos)
router.get("/verproductos/", autenticarToken, verificarRol(1), ProductosController.verProductosActivos)
router.get("/verproductoscategoria/:categoriaproductos_idcategoriaproductos", autenticarToken, verificarRol(1),
    ProductosController.VerProductosPorCategoria)
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;