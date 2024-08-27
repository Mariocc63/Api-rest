const express = require("express");
const router = express.Router();
const CategoriaProductosController = require("../controllers/CategoriaProductosController.js");
const {autenticarToken} = require("../middleware.js")

router.post("/categoriaproductos", autenticarToken, CategoriaProductosController.crearCategoriaProductos);
router.put("/categoriaproductos/:idcategoriaproductos", autenticarToken, CategoriaProductosController.actualizarCategoriaProductos)
router.get("/vercategoriaproductos", autenticarToken, CategoriaProductosController.verCategoriaProductosActivos)

//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;