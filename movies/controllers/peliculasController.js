let db = require('../database/models');

let peliculasController = {
    crear: function(req, res) {
        db.Genero.findAll()
        .then(function(generos) {
            return res.render('creacionPeliculas', {generos: generos});
        }
    )},
    guardar: function(req, res) {
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });

        res.redirect('/peliculas');
    },
    listado: async function(req, res) {
        // db.Pelicula.findAll()
        // .then(function(peliculas){
        //     return res.render('listadoPeliculas', {peliculas: peliculas});
        // });
        let pagina = 0;
        const pag = req.params.pag;
        if (pag) {
            pagina = (req.params.pag - 1) * 5;
        }
        const total = await db.Pelicula.count('id');
            const peliculas = await db.Pelicula.findAll({
            limit: 5,
            offset: pagina
        });
        
        res.render('listadoPeliculas', {
            peliculas: peliculas,
            total: total
        });
    }, 
    busqueda: async function(req, res) {
        const peliculasBuscadas = await db.Pelicula.findAll({
            where: {
              title: {
                [db.Sequelize.Op.like]: '%' + req.body.search + '%'
              }
            }
         });

         res.render('listadoPeliculas', {
            peliculas: peliculasBuscadas,
            total: undefined
        });
    },
    detalle: function(req, res) {
        db.Pelicula.findByPk(req.params.id, {
            include: [{association: 'genero'}, {association: 'actores'}]
        })
        .then(function(pelicula) {
            res.render('detallePelicula', {pelicula: pelicula});
        });
    },
    editar: async function(req, res) {
        let pedidoPelicula = await db.Pelicula.findByPk(req.params.id);

        let pedidoGeneros = await db.Genero.findAll();

        res.render('editarPelicula', {pelicula: pedidoPelicula, generos: pedidoGeneros})
    },
    actualizar: function(req, res) {
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        }, { where: {
            id: req.params.id
        }});

        res.redirect('/peliculas/' + req.params.id);
    }, 
    borrar: function(req, res) {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/peliculas');
    },
    peliculaPorGenero: function(req, res) {
        db.Pelicula.findAll({
            include: [{association: 'genero'}],
            where: {
                genre_id: req.params.id
            }
        })
        .then(function(peliculas){
            return res.render('listadoPorGenero', {peliculas: peliculas});
        });
    },
};

module.exports = peliculasController;