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




//Importamos express, path y router

const express = require('express');

const path = require('path');



//Importo el de Routes el enrutador del index en este caso mi pantalla principal
const productsRoute = require('./src/routes/productsRoute');
const usersRoute = require('./src/routes/usersRoute');

//Defino app para usar las funciones de express
const app = express();

//Defino app.use para mostrar la pantalla Index a traves del Routes / Enrutador que se importa arriba.

app.use('/', productsRoute)
app.use('/users', usersRoute)


//Para parasrse en carpeta public

app.use(express.static(path.resolve(__dirname, '..','./public')));





//Para que funcione ejs
app.set('views','./src/views')
app.set('view engine', 'ejs')

//Para levantar servidor con heroku
app.listen(process.env.PORT || 420, function(){
    console.log('Servidor corriendo en el puerto 420')
})