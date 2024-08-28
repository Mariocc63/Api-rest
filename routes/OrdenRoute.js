const express = require("express");
const router = express.Router();
const OrdenController = require("../controllers/OrdenController.js");
const {autenticarToken,verificarRol} = require("../middleware.js")

router.post("/orden/detalles", autenticarToken, verificarRol(1), OrdenController.crearOrden);
router.put("/orden/detalles/:idorden", autenticarToken, verificarRol(1), OrdenController.actualizarOrden)
router.get("/verordenes", autenticarToken, verificarRol(1), OrdenController.verOrdenes)
router.get("/verordenes/detalles/:orden_idorden", autenticarToken, verificarRol(1), 
    OrdenController.verOrdenesDetalles)


module.exports = router;