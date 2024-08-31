const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/ProductosController.js");
const {autenticarToken, verificarRol, dicciorioRoles} = require("../middleware.js")

router.post("/productos", autenticarToken, verificarRol(dicciorioRoles["Operador administrativo"]), 
ProductosController.crearProductos);
router.put("/productos/:idproductos", autenticarToken, verificarRol(dicciorioRoles["Operador administrativo"]),
 ProductosController.actualizarProductos)
router.get("/verproductos/", autenticarToken, verificarRol(dicciorioRoles["Operador administrativo"]), 
ProductosController.verProductosActivos)
router.get("/verproductoscategoria/:categoriaproductos_idcategoriaproductos", 
    autenticarToken, verificarRol(dicciorioRoles["Operador administrativo"]),
    ProductosController.VerProductosPorCategoria)
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;