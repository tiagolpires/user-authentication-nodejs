const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()

require('./auth')(passport)
const routes = require('./src/routes')

const port = process.env.PORT || 3001

const app = express()
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
    cookie: {maxAge: 30*60*1000}
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.set('view-engine', 'ejs')
app.set('views', __dirname + '/views');

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () =>{console.log('Connected to DB')}
)

app.use('/', routes)

app.listen(port)
