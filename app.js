const express = require('express');
const app =express();
const path = require('path');
const userRouter = require('./routes/userRoutes')
const cors = require("cors");
const bodyParser= require("body-parser");
const axios = require('axios');
app.use(cors());
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs')



app.use('/api/v1/users',userRouter)



app.get("/", (req, res) => {
    res.render('./public/html/home.ejs')
})



module.exports = app;