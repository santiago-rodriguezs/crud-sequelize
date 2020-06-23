var express = require('express');
var router = express.Router();
const peliculasController = require('../controllers/peliculasController');

// Creación
router.get('/crear', peliculasController.crear);
router.post('/crear', peliculasController.guardar);

// Lectura
router.get('/:pag?', peliculasController.listado);

// Búsqueda
router.post('/', peliculasController.busqueda)

// Detalle
router.get('/detalle/:id', peliculasController.detalle);

// Edición
router.get('/editar/:id', peliculasController.editar);
router.post('/editar/:id', peliculasController.actualizar);

//Borrado
router.post('/borrar/:id', peliculasController.borrar)

// Película por género
router.get('/peliculas-por-genero/:id', peliculasController.peliculaPorGenero)

module.exports = router;