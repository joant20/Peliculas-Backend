require('dotenv').config()

const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const app = express();

const PORT = process.env.PORT || 3000

const limiter = rateLimit({
    windows: 15 * 60 * 1000,
    max: 5,
    message: "Has superado el limite de solicitudes. por favor, intentalo de nuevo mas tarde.",
})

const peliculasRoutes = require('./routes/pelicula')
const authRoutes = require('./routes/auth')


app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())
app.use(cors({
    origin: 'https://localhost:5500',
    methods: ['GET','POST','PUT','DELETE']
}))
app.use(limiter)

app.use('/peliculas', peliculasRoutes)
app.use('/auth', authRoutes)

app.listen(PORT, () =>{
    console.log('Servidor corriendo en http://localhost:' + PORT)
})

