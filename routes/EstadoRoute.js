const express = require("express");
const router = express.Router();
const EstadoController = require("../controllers/EstadoController.js");
const {autenticarToken, verificarRol} = require("../middleware.js");

router.post("/estados", autenticarToken, verificarRol(1), EstadoController.crearEstado);
router.put("/estados/:idestados", autenticarToken, verificarRol(1), EstadoController.actualizarEstado);

module.exports = router;