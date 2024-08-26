const express = require("express");
const router = express.Router();
const OrdenController = require("../controllers/OrdenController.js");
const {autenticarToken} = require("../middleware.js")

router.post("/orden/detalles",OrdenController.crearOrden);
router.put("/orden/detalles/:idorden", autenticarToken, OrdenController.actualizarOrden)


module.exports = router;