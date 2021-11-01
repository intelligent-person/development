const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
const app = express();
//Middleware
app.use(bodyParser.json())
app.use(express.static('static'))
app.use(cors(corsOptions))
app.use(fileUpload({}))

//Import Routes
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const mongoose = require("mongoose");
const {static} = require("express");

app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)

mongoose.connect(process.env.DATABASE, function(err){
    if(err) return console.log(err);
    app.listen(5000, () => {
        console.log("Сервер ожидает подключения...")
    })
});
