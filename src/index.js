const mysql = require('mysql')
const express = require('express')
const session = require('express-session')
const router = require('./routes/index.routes.js')
const path = require('path')
const app = express()
const bp = require('body-parser');
const publicPath = path.resolve("./public")
console.log(publicPath)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.use(router)
/*app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/login.html'))
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/regAntes.html'))
})*/
app.listen(3000,()=>{
    console.log("Port is workin")
})