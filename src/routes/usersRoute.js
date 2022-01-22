//En Routes o Enrutador
//Importamos el controlador desde la carpeta controllers

const usersController = require('./../controllers/usersController')

//Importamos express

const express = require('express');

//Creamos la constante router para utilizar express.Router()
const router = express.Router();

//Utilizamos el metodo de transaccion .get para procesar la vista index
//El primer parametro muestra la ruta definida (en este caso el home por eso solo la barra)
//El segundo parametro utilizamos el controlador concatenado con el elemento a usar.

router.get('/login', usersController.login)
router.get('/register', usersController.register)
router.post('/', usersController.storeUser)

//Exportamos el metodo de transaccion definido para ser utilizado

module.exports =router;
