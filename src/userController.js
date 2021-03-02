const User = require('./User')
const bcrypt = require('bcrypt')

module.exports = {
    async register(req, res) {
        const emailExist = await User.findOne({email: req.body.email})
        const userNameExist = await User.findOne({name: req.body.name})
        if(emailExist){
            return res.render('register.ejs', {message : 'Email already exists'})
        }
        if(userNameExist){
            return res.render('register.ejs', {message : 'Username already exists'})
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        try{
            await user.save()
            res.redirect('/')
        } catch (err){
            res.status(400).send(err)
        }
    },
    async loginSucessful(req, res){
        const user = await User.findById(req.session.passport.user)
        res.render('loginSucess.ejs', {name: user.name, email: user.email, date: user.date})
    },
    loginPage(req, res) {
        if(req.query.fail){
            res.render('login.ejs', {message: 'Usuário e/ou senha inválidos'})
        } else{
            res.render('login.ejs', {message: null })
        }
    },
    registerPage(req, res) {
        res.render('register.ejs', {message:''})

    }
}