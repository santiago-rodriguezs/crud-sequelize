let db = require('../database/models');

let nuevaActuacionController = {
    crear: async function(req, res) {
        const actores = await db.Actor.findAll()
        const peliculas = await db.Pelicula.findAll()
        
        return res.render('crearNuevaActuacion', {
            actores: actores,
            peliculas: peliculas
        });
        
    },
    guardar: function(req, res) {
        db.ActorMovie.create({
            actor_id: req.body.actor_id,
            movie_id: req.body.movie_id,
        });
        res.redirect('/')
}
};

module.exports = nuevaActuacionController;