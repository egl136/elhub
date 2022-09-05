const mysql = require('mysql')
const express = require('express')
const session = require('express-session')
const router = require('./routes/index.routes.js')


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/login.html'))
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/regAntes.html'))
})
app.listen(3000,()=>{
    console.log("Port is workin")
})