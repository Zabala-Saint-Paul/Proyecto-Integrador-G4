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
		
		/*
		let userInDB = db.Companias.findOne({ where: { email: req.body.email } }).then()
		//let userInDB = User.findByField('email', req.body.email);
		
		if (userInDB){
			return res.render('./users/register',{
				//Transformo el array en un objeto literal
				errors: {
					email: {
						msg: 'Este email ya esta registrado'
					}
				},
				oldData: req.body,
			});
		} */
		//CREAR USUARIO CON SEQUELIZE MYSQL
		db.Companias.create({
			
			email: req.body.email,
			nombre: req.body.firstName,
			contraseña: bcrypt.hashSync(req.body.password, 10),      
			cuit: req.body.cuit,
			imagen_id: req.file.filename,
		})
		

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
			image: req.file.filename,
		}

		dbUsers.push(newUser);

		fs.writeFileSync(dbUsersJSON, JSON.stringify(dbUsers, null, " ")); */

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
		/*
		let userToLogin = User.findByField('email', req.body.email);
		if(userToLogin){
			
			let isOkThePassword = bcrypt.compareSync(req.body.password,userToLogin.password);

			if(isOkThePassword){
				delete userToLogin.password;
				
				req.session.userLogged = userToLogin;
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
		});*/
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