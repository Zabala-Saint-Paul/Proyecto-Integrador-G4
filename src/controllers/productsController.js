//Requires
const path = require('path');
const fs = require('fs');

//Trear base de datos en formato JSON
const dbProductsJSON = path.resolve(__dirname, '../data/productsDB.json');

//transformar en objeto literal
const dbProducts = JSON.parse(fs.readFileSync(dbProductsJSON, 'utf8'));

// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador
const controller = {
    index: function(req, res){
        res.render('./products/index', {
            productsList: dbProducts
        });
    },
    productCart: function(req, res){
        res.render('./products/productCart')
    },
    productDetail: function(req, res){
        res.render('./products/productDetail')
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
            image: req.file.fileName,
        }

        dbProducts.push(newProduct)

        fs.writeFileSync(dbProductsJSON, JSON.stringify(dbProducts, null, " "));

        return res.redirect('/'); 

    },
    editarProducto: function(req,res){
        res.render('./vendedores/editarProducto')
    }


}

module.exports = controller