const express = require('express')

const router = express.Router()

const peliculasModel = require('../models/peliculasModel')
const {verificarToken} = require('../middleware/authMiddleware')

//Metodo Get de http para consultar
router.get('/', (req, res) => {
    
    peliculasModel.obtenerPeliculas((error, resultados) => {

        if(error){
            res.status(500).send({error: 'error consultando las peliculas'})
        }
        else{
            res.json(resultados)
        }
    })
});

//Metodo Post para crear
router.post('/', verificarToken, (req, res) => {
    const pelicula = req.body;
    
    peliculasModel.crearPeliculas(pelicula, (error, resultados) =>{

        if(error){
            res.status(500).send({error: 'Error creando el producto'})
        }
        else{
            pelicula.id = resultados.insertId

            res.status(201).json(pelicula)
        }
    })
});

//Metodo Put de http para actualizar

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    
    const peliculas = req.body

    peliculasModel.actualizarPeliculas(id,peliculas, (error, resultado) => {

        if(error){
            res.status(500).send({error: 'Error actualizando la pelicula'})
        }
        else{

            if(resultado.affectedRows === 0){
            res.status(404).send({error: 'Pelicula no encontrada'})
        }
        else {
            res.send({ msg: 'Pelicula Actualizada'})
        }
    }
    })
})

//Metodo Delete http para eliminar
router.delete('/:id',verificarToken, (req, res) => {
    const id = parseInt(req.params.id)
    
    peliculasModel.eliminarPeliculas(id, (error, resultado) => {
    
        if(error){
            res.status(500).send({error: 'Error eliminando'})
        }
        else{
           res.send({msg: "Pelicula Eliminada"})
        }
    })
   
})

module.exports = router