const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController.js");
const {autenticarToken, verificarRol} = require("../middleware.js")

router.post("/usuario",autenticarToken, verificarRol(1), UsuarioController.crearUsuario);
router.put("/usuario/:idusuarios",autenticarToken, verificarRol(1), UsuarioController.actualizarUsuario);
router.post("/login",UsuarioController.login);
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;