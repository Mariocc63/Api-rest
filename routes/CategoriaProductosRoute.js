const express = require("express");
const router = express.Router();
const CategoriaProductosController = require("../controllers/CategoriaProductosController.js");

router.post("/categoriaproductos",CategoriaProductosController.crearCategoriaProductos);
router.put("/categoriaproductos/:idcategoriaproductos",CategoriaProductosController.actualizarCategoriaProductos)
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;