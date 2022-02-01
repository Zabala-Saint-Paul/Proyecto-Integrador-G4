//Requires
const path = require('path');
const fs = require('fs');

//Traer base de datos en formato JSON
const dbProductsJSON = path.resolve(__dirname, '../data/productsDB.json');

//transformar en objeto literal// Array de objetos literales
let dbProducts = JSON.parse(fs.readFileSync(dbProductsJSON, 'utf8'));

//Para formar el Unlink o unlikSync//
// Se guarda en la variable images el path donde estan las imagenes de los productos//

const images = path.join(__dirname, '../../public/images');

// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador
const controller = {
    index: function(req, res){
        dbProducts = JSON.parse(fs.readFileSync(dbProductsJSON, 'utf8'));
        res.render('./products/index', {
            p: dbProducts
        });
    },
    productCart: function(req, res){
        res.render('./products/productCart')
    },

    productDetail: function(req, res){
        let idProductoSeleccionado = req.params.id;
		let productoSeleccionado;

		for (let p of dbProducts){

			if(p.id==idProductoSeleccionado){
				productoSeleccionado=p;
				break;
			}
		}

		
        res.render('./products/productDetail',{products:productoSeleccionado})
    },
    productsList: (req,res)=>{
        res.render('./products/productsList',{
            productsList: dbProducts
        })
    },
    crearProducto: function(req,res){
        res.render('./vendedores/crearProducto')
    },
    storeProduct: function(req,res){
        const generateID = () => {
			// 1. Obtenemos el último producto almacenado en la DB
			const lastProduct = dbProducts[dbProducts.length - 1];
			// 2. Obtenemos el ID de ese último producto
			const lastID = lastProduct.id;
			// 3. Retornamos ese último ID incrementado en 1
			return lastID + 1;
		}

        const newProduct = {
            id: generateID(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename,
        }

        dbProducts.push(newProduct)

        fs.writeFileSync(dbProductsJSON, JSON.stringify(dbProducts, null, " "));

        return res.redirect('/'); 

    },
    editarProducto: function(req,res){
        let idProductoSeleccionado = req.params.id;
		let productoSeleccionado;

		for (let p of dbProducts){

			if(p.id==idProductoSeleccionado){
				productoSeleccionado=p;
				break;
			}
		}
        
		
        res.render('./vendedores/editarProducto',{products:productoSeleccionado})
    },
    update: function(req,res){

		let idProductoSeleccionado = req.params.id;
        let datos = req.body;

		for (let p of dbProducts){
            
            if(p.id == idProductoSeleccionado && datos.image !=undefined) {
                p.name = datos.name;
				p.price = datos.price;
                p.image = req.file.filename;          
                p.description = datos.description;
				break;
            } else {
                p.name = datos.name;
				p.price = datos.price;
                //Falta solucionar como hacer que si no se sube una imagen nueva el sistema carge la imagen actual.         
                p.description = datos.description;
				break;

            }
		}
        //EL PRIMER PARAMETRO ES LA BD JSON IMPORTADA, EL SEGUNDO PARAMETRO LO ESTA SOBRE ESCRIBIENDO
		fs.writeFileSync(dbProductsJSON, JSON.stringify(dbProducts,null,' '));

	    res.redirect('/');
    },
   // Delete - Borrar un producto de la base de datos .json
	destroy: (req, res) => {

		//Obtengo el id del objeto que quiero eliminar
        let idProductoSeleccionado = req.params.id;
       
        // en esta variable filtramos de la base de datos todos los productos que son distintos
        //al producto que se quiere eliminar

		let products2 = dbProducts.filter(function(element){
			return element.id!=idProductoSeleccionado;
		})

        //Para eliminiarla imagen del producto

        let products1 = dbProducts.filter(function(element){
            return element.id==idProductoSeleccionado;
        })
        
       // Esta linea sirve para elimar la imagen del producto de la base de datos

       fs.unlink(path.join(images,products1[0].image ),(err) => {if (err) console.log(err)})

        //dbProductsJSON es la base de datos en formato Json
        //JSON.stringify transforma en json el array de objetos products2
        //Fs.writeFileSync sobre escribe el arhivo json dbProductsJason

		fs.writeFileSync(dbProductsJSON, JSON.stringify(products2,null,' '));

	    res.redirect('/');


	},
   
   

	
	
       
    


}

module.exports = controller