//Requires
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator')
//Traer base de datos en formato JSON
const dbProductsJSON = path.resolve(__dirname, '../data/productsDB.json');

//transformar en objeto literal// Array de objetos literales
let dbProducts = JSON.parse(fs.readFileSync(dbProductsJSON, 'utf8'));
//Requiero la base de datos desde los modelos alwaysdata
const db = require('../database/models');
//Para formar el Unlink o unlikSync//
// Se guarda en la variable images el path donde estan las imagenes de los productos//

const images = path.join(__dirname, '../../public/images');

// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador
const controller = {
    index: function(req, res){
        db.Viajes.findAll()
        .then(function(viajes){
           
            return res.render('./products/index', {viaje:viajes})
        })
    },
    productCart: function(req, res){
        res.render('./products/productCart')
    },

    productDetail: function(req, res){

        db.Viajes.findByPk(req.params.id)
        .then(function(viajes){
           
            res.render('./products/productDetail',{products:viajes})
        })
    },
    productsList: (req,res)=>{
        db.Viajes.findAll()
    .then(function(viajes){
        
        res.render('./products/productsList',{productsList:viajes})
    })

    },
    crearProducto: function(req,res){
        res.render('./vendedores/crearProducto')
    },
    storeProduct: function(req,res){
       //Aca defino la variable que guarda los errores del ValidationRules que defini en el enrutador de User
       const resultValidation = validationResult(req);
		
       //Aca voy a decir que si hay errores quiero que estos se rendericen en el formulario de registro
       if (resultValidation.errors.length > 0){
           return res.render('./vendedores/crearProducto',{
               //Transformo el array en un objeto literal
               errors: resultValidation.mapped(),
               oldData: req.body,
           });
       }
       
        db.Viajes.create({
      
        
            precio: req.body.price,
            fecha:req.body.fecha,
            descripcion: req.body.description,
            nombre: req.body.name,
            imagen_id: req.file.filename,
            capacidad_nave:req.body.capacidad,
            companiasFK: 1,
    
        });
        res.redirect('/')
    },

//IR A EDITAR PRODUCTO
    editarProducto: function(req,res){

        db.Viajes.findByPk(req.params.id)
        
        .then(function(viajes){
           
            res.render('./vendedores/editarProducto',{products:viajes})
        })
    },
    update: function(req,res){
     
        db.Viajes.update({
      
        
            precio: req.body.price,
            fecha:req.body.fecha,
            descripcion: req.body.description,
            nombre: req.body.name,
            imagen_id: req.file.filename,
            capacidad_nave:req.body.capacidad,
            companiasFK: req.body.compania_id,
    
        },{
            where:{
                id: req.params.id}
        });
        res.redirect('/')
    },
   // Delete - Borrar un producto de la base de datos .json
	destroy: (req, res) => {

        db.Viajes.destroy({
            where:{
                id: req.params.id
            }
        })

		//Obtengo el id del objeto que quiero eliminar
        //let idProductoSeleccionado = req.params.id;
       
        // en esta variable filtramos de la base de datos todos los productos que son distintos
        //al producto que se quiere eliminar

		//let products2 = dbProducts.filter(function(element){
		//	return element.id!=idProductoSeleccionado;
		//})

        //Para eliminiarla imagen del producto

      //  let products1 = dbProducts.filter(function(element){
       //     return element.id==idProductoSeleccionado;
      //  })
        
       // Esta linea sirve para elimar la imagen del producto de la base de datos

      // fs.unlink(path.join(images,products1[0].image ),(err) => {if (err) console.log(err)})

        //dbProductsJSON es la base de datos en formato Json
        //JSON.stringify transforma en json el array de objetos products2
        //Fs.writeFileSync sobre escribe el arhivo json dbProductsJason

		//fs.writeFileSync(dbProductsJSON, JSON.stringify(products2,null,' '));

	    res.redirect('/');


	},
}

module.exports = controller