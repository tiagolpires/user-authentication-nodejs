const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const routes = require('./src/routes')

const port = process.env.PORT || 3001

const app = express()

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

app.listen(3001)
