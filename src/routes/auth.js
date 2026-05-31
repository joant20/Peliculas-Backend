const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {buscarUsuario, crearUsuario} = require('../models/authModel')
const { SECRET } = require('../middleware/authMiddleware')

router.post('/register', (req, res) => {
    const { username, password } = req.body

    if(!username || !password){
        return res.status(400).json({error: 'username y password requeridos'})
    }

    const passwordHash = bcrypt.hashSync(password, 10)

    crearUsuario(username, passwordHash, (error, resultado) => {
        if(error){
            if(error.code ==='ER_DUP_ENTRY'){
            return res.status(409).json({error: 'El usuario ya existe'})
            }

            return res.status(500).json({error:'Error creando el usuario'})
        }

        res.status(201).json({msg: 'Usuario creado' })
    })
})

router.post('/login', (req, res) => {
    const{username, password } = req.body

    if(!username || !password){
        return res.status(400).json({error: 'username y password requeridos'})
    }

    buscarUsuario(username, (error, resultados) => {
        if(error){
            return res.status(500).json({error:'Error en el servidor'})
        
        }

        if(resultados.length === 0){
            return res.status(401).json({error:'Crendeciales invalidas'})
        }

        const usuario = resultados[0]


        const passwordValido = bcrypt.compareSync(password, usuario.password)

        if(!passwordValido){
            return res.status(401).json({error:'Crendeciales invalidas'})
        }

        const token = jwt.sign(
            {id: usuario.id, username: usuario.username },
            SECRET,
            {expiresIn: '2h' }
        )

        res.json({ token })
    })
}) 

module.exports = router