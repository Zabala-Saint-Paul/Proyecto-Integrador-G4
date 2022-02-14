//En Routes o Enrutador

const {body} = require('express-validator')
//Importamos el controlador desde la carpeta controllers

const usersController = require('./../controllers/usersController')

//Importamos express

const express = require('express');

//Creamos la constante router para utilizar express.Router()
const router = express.Router();



// Aca declararemos las Validation Rules para el formulario

const validationRules = [
    body('firstName')
    .notEmpty().withMessage("Debes completar con el Nombre completo"),

    body('lastName')
    .notEmpty().withMessage("Debes completar con el Apellido completo"),

    body('email')
    .notEmpty().withMessage('Debes completar con el email').bail()
    .isEmail().withMessage('El formato debe ser del estilo direccion@algo.com'),

    body('password')
    .notEmpty().withMessage('Debes completar este campo').bail()
    .isLength({min:8}).withMessage('Como minimo tiene que tener 8 caracteres'),

   

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

router.get('/login', usersController.login)
router.get('/register', usersController.register)
router.post('/register',validationRules, usersController.storeUser)

//Exportamos el metodo de transaccion definido para ser utilizado

module.exports = router;
