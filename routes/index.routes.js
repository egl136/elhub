const express = require('express')
const router = express.Router()

router.get("/",(req,res)=>{
    res.sendFile("/views/login.html")
})

module.exports = router