const express = require('express')
const routes = express.Router()
const userController = require('./userController')
const passport = require('passport')

routes.get('/', userController.loginPage)
routes.get('/register', userController.registerPage)
routes.get('/user', authenticationMiddleware, userController.loginSucessful)

routes.post('/', (req, res) => passport.authenticate('local', { 
    successRedirect: '/user', 
    failureRedirect: '/?fail=true', 
})(req, res))
routes.post('/register', userController.register)

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/?fail=true');
}

module.exports = routes