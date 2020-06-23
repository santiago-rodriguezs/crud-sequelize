let db = require('../database/models');

let actoresController = {
    crear: function(req, res) {
        return res.render('creacionActores');
    },
    guardar: function(req, res) {
        db.Actor.create({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
        });

        res.redirect('/actores');
    },
    listado: async function(req, res) {
        let pagina = 0;
        const pag = req.params.pag;
        if (pag) {
            pagina = (req.params.pag - 1) * 5;
        }
        const total = await db.Actor.count('id');
            const actores = await db.Actor.findAll({
            limit: 5,
            offset: pagina
        });
        
        res.render('listadoActores', {
            actores: actores,
            total: total
        });
    }, 
    busqueda: async function(req, res) {
        const actoresBuscados = await db.Actor.findAll({
            where: {
              first_name: {
                [db.Sequelize.Op.like]: '%' + req.body.search + '%'
              }
            }
         });

        res.render('listadoActores', {
            actores: actoresBuscados,
            total: undefined
        });
    },
    detalle: function(req, res) {
        db.Actor.findByPk(req.params.id, {
            include: [{association: 'peliculas'}]
        })
        .then(function(actor) {
            res.render('detalleActor', {actor: actor});
        });
    },
    editar: async function(req, res) {
        let pedidoActor = await db.Actor.findByPk(req.params.id);

        res.render('editarActor', {actor: pedidoActor})
    },
    actualizar: function(req, res) {
        db.Actor.update({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
        }, { where: {
            id: req.params.id
        }});

        res.redirect('/actores/' + req.params.id);
    }, 
    borrar: async function(req, res) {
        await db.Actor.destroy({
            where: {
                id: req.params.id
            }
        });

        await db.ActorMovies.destroy({
            where: {
                movie_id: req.params.id
            }
        })

        res.redirect('/actores');
    },
};

module.exports = actoresController;