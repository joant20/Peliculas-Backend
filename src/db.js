const mysql = require('mysql2')

const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'peliculas'
})

connection.connect((error) => {
    if(error){
        console.log('error conectando a la Base de Datos')
    }
    else{
        console.log('conectado a la Base de Datos!')
    }
})


module.exports = connection
