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

app.listen(420, function(){
    console.log('servidor corriendo');
});