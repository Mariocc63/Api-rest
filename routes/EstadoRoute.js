const express = require("express");
const router = express.Router();
const EstadoController = require("../controllers/EstadoController.js");
const {autenticarToken} = require("../middleware.js");

router.post("/estados", autenticarToken, EstadoController.crearEstado);
router.put("/estados/:idestados", autenticarToken, EstadoController.actualizarEstado);

module.exports = router;