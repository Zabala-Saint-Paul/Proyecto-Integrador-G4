// En controllers tengo los controladores
// En este caso le indico que index va a renderizar la pantalla index, con el nombre de la view ya alcanza,
// Hay que definir la ruta completa para cada ventana (?)
// Son las acciones que va a realizar mi controlador

const controller = {
    index: function(req, res){
        res.render('./products/index')
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
    editarProducto: function(req,res){
        res.render('./vendedores/editarProducto')
    }


}

module.exports = controller