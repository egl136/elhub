const path = require('path')
const express = require('express')
const router = express.Router()
const loginControl = require("../controllers/login.js")

router.get("/",(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
    //res.sendFile(path.resolve('./views/login.html'))
})
router.use(loginControl)

module.exports = router