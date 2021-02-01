const express = require('express')

const routes = express.Router()

const userController = require('./userController')

routes.get('/', userController.loginPage)
routes.get('/register', userController.registerPage)

routes.post('/', userController.login)
routes.post('/register', userController.register)

routes.get('/loginSucess', (req, res) => {
    res.render('loginSucess.ejs', {name: 'Tiagoo', email: 'taigolsadasd@hotmail.com', date: '21/02/2002'})
})

module.exports = routes