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
    }
}

module.exports = controller