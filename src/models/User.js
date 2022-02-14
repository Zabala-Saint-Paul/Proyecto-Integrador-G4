// Armado del CRUD de usuarios.

//1- Guardar al usuario en la Data Base-DB
//2- BUscar al usuiario que se quiere loguear por su email
//3- Buscar a un usuario por su ID
//4- Editar la informacion de un usuario
//5- Elimiar a un susuario de la Data Base - DB

const { all } = require('express/lib/application');
const req = require('express/lib/request');
const fs = require('fs')

//Creamos un objeto literal con los metodos para llevar adelante el CRUD.
const User = {
    //En esta variable guardo la ruta hacia el archivo .json de la DB de usuarios
    fileName:'./src/data/usersDB.json',
    //Obtengo la informacion de la base de datos de usuarios con getData
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    //Funcion para generar el id del usuario nuevo

    generatedId: function () {
        
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id +1;

        }
        return 1;

       

    },

    //Si quisiera encontrar todos los usuarios uso el metodo findAll

    findAll: function () {
        return this.getData();
    },

    //3- Funcion para encontrar a un suuario por ID

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser.id === id);
        return userFound;
    },

    // 2- Funcion para encontrar por campo , puede ser email, nombre , etc.
    // el primer valor es del campo que quiero buscar, email, nombre , etc.
    //Si hay varios con el mismo valor guardado me trae el primero que encuentra!!!
    // el segundo parametro es el valor que quiero que tenga guardado el campo.
    findByField: function(field,text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find( oneUser => oneUser[field] === text);
        return userFound;
    },
    //Crear un usuario y guardarlo en la base de datos

    create: function (userData) {
        let allUsers = this.findAll();

        // Creo la variable con los datos del nuevo usuario
        let newUser = {
            id: this.generatedId(),
            ...userData,
        }

        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        
        return newUser;
    },

    delete: function (id) {
        let allUsers = this.findAll();

        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
        return true;
        
    }

}

module.exports = User;