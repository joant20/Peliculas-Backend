const express = require('express');
const app = express();

const peliculasRoutes = require('./routes/pelicula')

app.use(express.json());

app.use('/peliculas', peliculasRoutes)

app.listen(3000, () =>{
    console.log('Servidor corriendo en http://localhost:3000')
})