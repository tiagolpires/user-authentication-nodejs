const User = require('./User')
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res) {
  
    },
    async register(req, res) {
        const emailExist = await User.findOne({email: req.body.email})
        if(emailExist){
            return res.render('register.ejs', {message : 'Email already exists'})
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
    async login(req, res){
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.render('login.ejs', {message : 'Email doesnt exist'})
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
            return res.render('login.ejs', {message : 'Invalid Password'})
        }
        res.render('loginSucess.ejs', {name: user.name, email: user.email, date: user.date})
    },

    loginPage(req, res) {
        res.render('login.ejs', {message:''})
    },
    registerPage(req, res) {
        res.render('register.ejs', {message:''})

    }
}