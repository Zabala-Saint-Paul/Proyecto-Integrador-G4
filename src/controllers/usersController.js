//Requires
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

//Trear base de datos en formato JSON
const dbUsersJSON = path.resolve(__dirname, '../data/usersDB.json');

//transformar en objeto literal
const dbUsers = JSON.parse(fs.readFileSync(dbUsersJSON, 'utf8'));

// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador
const controller = {
    login: function(req, res){
        res.render('./users/login')
    },
    register: function(req, res){
        res.render('./users/register')
    },
    storeUser: (req, res) => {
		//Aca defino la variable que guarda los errores del ValidationRules que defini en el enrutador de User
		const resultValidation = validationResult(req);
		res.send(resultValidation.mapped())
		
	/*	//Aca voy a decir que si hay errores quiero que estos se rendericen en el formulario de registro
		if (resultValidation.errors.length > 0){
			return res.render('./users/register',{
				//Transformo el array en un objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
		
/*


		const generateID = () => {
			// 1. Obtenemos el último usuario almacenado en la DB
			const lastUser = dbUsers[dbUsers.length - 1];
			// Esto se hace por si la base de datos esta vacia
			if(lastUser !== undefined) {
				// 2. Obtenemos el ID de ese último usuario
				const lastID = lastUser.id;
				// 3. Retornamos ese último ID incrementado en 1
				return lastID + 1;
			}

			return 1;
		}

		const newUser = {
			id: generateID(),
			firstName: req.body.firstName,
            lastName: req.body.lastName,
			password: bcrypt.hashSync(req.body.password, 10),
			email: req.body.email,
		}

		dbUsers.push(newUser);

		fs.writeFileSync(dbUsersJSON, JSON.stringify(dbUsers, null, " "));

		return res.redirect("/users/login"); */
	}
		
}


module.exports = controller