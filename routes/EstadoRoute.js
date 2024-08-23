const express = require("express");
const router = express.Router();
const EstadoController = require("../controllers/EstadoController.js");

router.post("/estados",EstadoController.crearEstado);
/* router.get('/test', (req, res) => {
    res.status(200).send('Ruta de prueba funciona');
  }); */
router.put("/estados/:idestados",EstadoController.actualizarEstado);

module.exports = router;