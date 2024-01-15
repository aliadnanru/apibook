const express = require("express");
const {stringify} = require("nodemon/lib/utils");
const app = express();
const joi = require('joi')
const mongoose = require('mongoose')
//Modells
const routerUser = require('./Routes/auth')
const logger = require('./Middleware/logger')
const routerBooks = require('./Routes/Books')
const routerAuthors = require('./Routes/authors')
const routerUsers = require('./Routes/usera')

//dotenv
const dotenv = require('dotenv')
dotenv.config()
// Connection to  mongodb://localhost:27017
//mongodb://localhost:3000/data1
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("The database connection was successful")
    })
    .catch((e) => {
        console.log("404" + e)
    })
app.use(express.json());
app.use(logger)

app.use('/api/books', routerBooks)
app.use('/api/authors', routerAuthors)
app.use('/api/auth', routerUser)
app.use('/api/users', routerUsers)


app.listen(3000, () => {
    console.log("App Working in Port 3000")
})