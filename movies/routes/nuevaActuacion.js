var express = require('express');
var router = express.Router();
const nuevaActuacionController = require('../controllers/nuevaActuacionController');

/* GET home page. */
router.get('/', nuevaActuacionController.crear);
router.post('/', nuevaActuacionController.guardar);




module.exports = router;