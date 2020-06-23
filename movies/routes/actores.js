var express = require('express');
var router = express.Router();
const actoresController = require('../controllers/actoresController');

// Creación
router.get('/crear', actoresController.crear);
router.post('/crear', actoresController.guardar);

// Lectura
router.get('/:pag?', actoresController.listado);

// Búsqueda
router.post('/', actoresController.busqueda)

// Detalle
router.get('/detalle/:id', actoresController.detalle);

// Edición
router.get('/editar/:id', actoresController.editar);
router.post('/editar/:id', actoresController.actualizar);

//Borrado
router.post('/borrar/:id', actoresController.borrar)

module.exports = router;