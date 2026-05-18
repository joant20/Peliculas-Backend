const express = require('express')

const router = express.Router()

const peliculasModel = require('../models/peliculasModel')

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

//Metodo post para crear
router.post('/', (req, res) => {
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

router.delete('/:id',(req, res) => {
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