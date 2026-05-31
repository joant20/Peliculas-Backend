const db = require('../db')

const buscarUsuario = (username, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE username = ?'
    db.query(
        sql,
        [username], 
        callback)
}

const crearUsuario = (username, passwordHash, callback) => {
    const sql = 'INSERT INTO usuarios (username, password) VALUES(?, ?)'
    db.query(
        sql, 
        [username, passwordHash], 
        callback)
}

module.exports = {
    buscarUsuario,
    crearUsuario
}