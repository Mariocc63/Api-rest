const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController.js");

router.post("/usuario",UsuarioController.crearUsuario);
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;