const express = require('express')

const routes = express.Router()

const userController = require('./userController')

routes.get('/', userController.loginPage)
routes.get('/register', userController.registerPage)

routes.post('/', userController.login)
routes.post('/register', userController.register)

module.exports = routes