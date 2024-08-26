const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController.js");
const {autenticarToken} = require("../middleware.js")

router.post("/usuario",autenticarToken, UsuarioController.crearUsuario);
router.put("/usuario/:idusuarios",autenticarToken, UsuarioController.actualizarUsuario);
router.post("/login",UsuarioController.login);
//router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;