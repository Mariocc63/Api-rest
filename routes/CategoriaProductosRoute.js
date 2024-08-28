const express = require("express");
const router = express.Router();
const CategoriaProductosController = require("../controllers/CategoriaProductosController.js");
const {autenticarToken, verificarRol} = require("../middleware.js")

router.post("/categoriaproductos", autenticarToken, verificarRol(1), CategoriaProductosController.crearCategoriaProductos);
router.put("/categoriaproductos/:idcategoriaproductos", autenticarToken, verificarRol(1), CategoriaProductosController.actualizarCategoriaProductos)
router.get("/vercategoriaproductos", autenticarToken, verificarRol(1), CategoriaProductosController.verCategoriaProductosActivos)

//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;