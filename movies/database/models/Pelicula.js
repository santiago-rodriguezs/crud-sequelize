module.exports = function(sequelize, dataTypes) {
    let alias = 'Pelicula';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        release_date: {
            type: dataTypes.DATE
        },
        genre_id: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'movies',
        timestamps: false
    }
    
    let Pelicula = sequelize.define(alias, cols, config);

    Pelicula.associate = function(models) {
        Pelicula.belongsTo(models.Genero, {
            as: 'genero',
            foreignKey: 'genre_id'
            });

        Pelicula.hasMany(models.ActorMovie, {
                as: 'actor_Movie',
                foreignKey: 'movie_id'
            });

        Pelicula.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestapms: false
        });
    };

    return Pelicula
};