/*
const express = require('express');
const path = require('path');


const publicPath = path.resolve(__dirname, './public')

const app = express();

app.use(express.static(publicPath));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname, './views/register.html'));
});

app.get ('/login', function (req,res){
    res.sendFile (path.join(__dirname, './views/login.html'))
});
app.get ('/productDetail', function (req,res){
    res.sendFile (path.join(__dirname, './views/productDetail.html'))
});
app.get ('/productCart', function (req,res){
    res.sendFile (path.join(__dirname, './views/productCart.html'))
});
*/
/*
app.listen(420, function(){
    console.log('servidor corriendo');
});
*/


// ************ Require's ************

//Importamos express, path y router

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan'); // morgan: middleware de registro de solicitudes hht para node.js 
const path = require('path');
const methodOverride =  require('method-override');// Pasar poder usar los métodos PUT y DELETE
const session = require('express-session');
const lMiddleware = require('./src/middlewares/loginMiddleware');


//Defino app para usar las funciones de express
const app = express();
// Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(express.static(path.resolve(__dirname,'./public')));

//Necesario para guardar informacion en los JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev')); // morgan: middleware de registro de solicitudes hht para node.js 
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({secret:'frase secreta', resave:false, saveUninitialized: false}));
app.use(lMiddleware)

//Para que funcione ejs
app.set('views','./src/views')
app.set('view engine', 'ejs')

//Importo el de Routes el enrutador del index en este caso mi pantalla principal
const productsRoute = require('./src/routes/productsRoute');
const usersRoute = require('./src/routes/usersRoute');



//Defino app.use para mostrar la pantalla Index a traves del Routes / Enrutador que se importa arriba.

app.use('/', productsRoute)
app.use('/users', usersRoute)

//Para parasrse en carpeta public



//Para levantar servidor con heroku
app.listen(process.env.PORT || 420, function(){
    console.log('Servidor corriendo en el puerto 420')
})

module.exports = app;









