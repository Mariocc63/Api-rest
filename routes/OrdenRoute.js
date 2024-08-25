const express = require("express");
const router = express.Router();
const OrdenController = require("../controllers/OrdenController.js");

router.post("/orden/detalles",OrdenController.crearOrden);
router.put("/orden/detalles/:idorden",OrdenController.actualizarOrden)


module.exports = router;