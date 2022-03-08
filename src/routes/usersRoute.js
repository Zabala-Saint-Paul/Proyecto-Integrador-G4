//En Routes o Enrutador


//Importamos el controlador desde la carpeta controllers

const usersController = require('./../controllers/usersController')

//Importamos express
const {body} = require('express-validator');
const express = require('express');
const multer = require('multer');
const path = require('path');


//Creamos la constante router para utilizar express.Router()
const router = express.Router();


const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/imgUsers'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

const validationRules = [
    body('firstName')
    .notEmpty().withMessage("Debes completar con el nombre completo"),

    body('cuit')
    .notEmpty().withMessage("Debes completar con el cuit de la empresa"),

    body('email')
    .notEmpty().withMessage('Debes completar con el email').bail()
    .isEmail().withMessage('El formato debe ser del estilo direccion@algo.com'),

    body('password')
    .notEmpty().withMessage('Eliga una contraseña').bail()
    .isLength({min:8}).withMessage('Como minimo tiene que tener 8 caracteres'),

    body('cuit')
    .notEmpty().withMessage("Debes completar el CUIT corresponiente").bail()
    .custom((value, {req}) => {
        let cuit = req.body.cuit
        if(!cuit == 'number' && !cuit.includes('-')){
            throw new Error('Debe completar con formato de CUIT')
        }
        return true
    }) ,

    //Aca realizaremos una validacion custom porque no viene una predeterminada para las imagenes

    body('image').custom((value, {req}) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png','.gif'];
      
      if (!file){
        throw new Error('Tienes que subir una imagen')
      }else{
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
  
        }
      }
      
      return true;
    }),
   


    
]
//Utilizamos el metodo de transaccion .get para procesar la vista index
//El primer parametro muestra la ruta definida (en este caso el home por eso solo la barra)
//El segundo parametro utilizamos el controlador concatenado con el elemento a usar.

// formulario de login //
router.get('/login', usersController.login);
// procesar el login //

router.post('/login', usersController.loginProcess);

// formulario de register //
router.get('/register', usersController.register);
// Procesar el registro//
router.post('/', uploadFile.single('image'),validationRules, usersController.storeUser);
//Perfil del usuario//
router.get('/profile', usersController.profile);
//Logout
router.get('/logout', usersController.logout);



//Exportamos el metodo de transaccion definido para ser utilizado

module.exports = router;
