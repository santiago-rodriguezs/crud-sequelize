module.exports = function(sequelize, dataTypes) {
    let alias = 'ActorMovie';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.INTEGER,
        },
        movie_id: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: 'actor_movie',
        timestamps: false
    }
    
    let ActorMovie = sequelize.define(alias, cols, config);

    ActorMovie.associate = function(models) {
        ActorMovie.belongsTo(models.Pelicula, {
            as: 'peliculas',
            foreignKey: 'movie_id'
        });

        ActorMovie.belongsTo(models.Actor, {
            as: 'actores',
            foreignKey: 'actor_id'
        });
    };

    return ActorMovie
};