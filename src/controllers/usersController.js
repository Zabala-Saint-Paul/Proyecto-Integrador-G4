//Requires
const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')



//Trear base de datos en formato JSON
const dbUsersJSON = path.resolve(__dirname, '../data/usersDB.json');

//transformar en objeto literal
const dbUsers = JSON.parse(fs.readFileSync(dbUsersJSON, 'utf8'));
const db = require('../database/models');
const User = require('../models/User');
// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador
const controller = {
    register: function(req, res){
        res.render('./users/register')
    },
    storeUser: (req, res) => {
		
		//Aca defino la variable que guarda los errores del ValidationRules que defini en el enrutador de User
		const resultValidation = validationResult(req);
		
		//Aca voy a decir que si hay errores quiero que estos se rendericen en el formulario de registro
		if (resultValidation.errors.length > 0){
			return res.render('./users/register',{
				//Transformo el array en un objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
		//CREAR USUARIO CON SEQUELIZE MYSQL
		db.Companias.create({
			
			email: req.body.email,
			nombre: req.body.firstName,
			contraseña: bcrypt.hashSync(req.body.password, 10),      
			cuit: req.body.cuit,
			imagen_id: req.file.filename,
		})
		return res.redirect("/users/login");
	}, 
	login: function(req, res){
        res.render('./users/login')
    },
	loginProcess: (req,res) =>{
		//ENCONTRAR USUARIO POR MAIL CON SEQUELIZE MYSQL
		db.Companias.findOne({ where: { email: req.body.email }, })
		//En compania traigo todos los datos de la base de datos, relacionados al mail que se quiere loguear
		.then(compania =>{
			
			
			if(compania){
				let isOkThePassword = bcrypt.compareSync(req.body.password,compania.contraseña);

				

				if(isOkThePassword){
					req.session.userLogged = compania;
					
					res.redirect('/users/profile')

				}
				return res.render('./users/login', {
					errors: {
						email:{
							msg: 'Las credenciales son invalidas'
						}
					}
				});
				
			}
			return res.render('./users/login', {
				errors: {
					email:{
						msg: 'No se encuentra este email en nuestra base de datos'
					}
				}
			});

			

			
		} )
	},
	profile: function(req, res){
        res.render('./users/profile', {
			user: req.session.userLogged,
		})
    },
	logout: (req,res)=>{
		//Este codigo lo que hace es borrar la informacion de session
		req.session.destroy();
		return res.redirect('/')
	},
	
}


module.exports = controller