const db = require('../db')

//Obtener las peliculas

const obtenerPeliculas = (callback) => {
    const sql = 'SELECT * FROM movies'

    db.query(sql, callback)
}

//Crear peliculas
const crearPeliculas = (peliculas, callback) => {
  const sql = 'INSERT INTO movies(Titulo, Director, Genero, anio) VALUES (?, ?, ?, ?)'

  db.query(
    sql,
    [peliculas.Titulo, peliculas.Director, peliculas.Genero, peliculas.anio],
    callback
  )
}

//Actualizar Peliculas
const actualizarPeliculas = (id, peliculas, callback) => {
    const sql = 'UPDATE movies SET Titulo = ?, Director = ?, Genero = ?, anio = ? WHERE id = ?'
    

    db.query(
        sql,
        [peliculas.Titulo, peliculas.Director, peliculas.Genero, peliculas.anio, id],
        callback
    )
}

//Eliminar Peliculas

    const eliminarPeliculas = (id, callback) => {
        const sql = 'DELETE FROM movies WHERE id = ?'

        db.query(
            sql,
            [id],
            callback
            
        )
    }

    module.exports = {
        obtenerPeliculas,
        crearPeliculas,
        actualizarPeliculas,
        eliminarPeliculas
    }