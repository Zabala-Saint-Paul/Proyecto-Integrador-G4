function lMiddleware(req, res, next){
    res.locals.isLogged = true

    next();
}

module.exports = lMiddleware