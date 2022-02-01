
//Importamos express

const express = require('express');
const multer = require('multer');
const path = require('path');


//Creamos la constante router para utilizar express.Router()
const router = express.Router();


const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

//En Routes o Enrutador
//Importamos el controlador desde la carpeta controllers

const productsController = require('./../controllers/productsController')

//Utilizamos el metodo de transaccion .get para procesar la vista index
//El primer parametro muestra la ruta definida (en este caso el home por eso solo la barra)
//El segundo parametro utilizamos el controlador concatenado con el elemento a usar.

router.get('/', productsController.index)



router.get('/productCart', productsController.productCart)

//DETALLE DE UN PRODUCTO

router.get('/productDetail/:id', productsController.productDetail)

router.get('/productsList', productsController.productsList)
//CREAR PRODUCTO//
router.get('/crearProducto', productsController.crearProducto)
router.post('/', uploadFile.single('image'), productsController.storeProduct)
//router.post('/crearProducto',uploadFile.single('image'), productsController.crearProducto)

//EDITAR PRODUCTO

router.get('/edit/:id', productsController.editarProducto)
router.put('/edit/:id', uploadFile.single('image'),productsController.update)


// ELIMINAR PRODUCTO

router.delete('/delete/:id', productsController.destroy); 


//Exportamos el metodo de transaccion definido para ser utilizado

module.exports =router;
