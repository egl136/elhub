//REQUIRES
const express = require('express')
const bcrypt = require('bcrypt')
const loginRequest = express.Router()
const mysql      = require('mysql')

//CONNECTING TO DATABASE
//-h remotemysql.com
//-u TxaExXMhdw
//-p 9LejGSNxsB
//use TxaExXMhdw
const connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'TxaExXMhdw',
    password : '9LejGSNxsB',
    database: 'TxaExXMhdw'
})

const login = (req, res)=>{
    //Get post from request
    const mail = req.body.usuinput
    const psswd = req.body.pasinput
    //Connect to database
    connection.connect()
    const query = "SELECT * FROM Users WHERE user_mail = '"+mail+"'"
    let hash = ""
    connection.query(query, (err, results, fields) => {
        if (err) res.send(err)
        if (results.length!==1) res.send(false)
        //As hashes were generated with php, they use $2y$ prefix, so it is
        //just exchanged to $2a$ prefix
        hash = results[0].user_hash.replace('$2y$', '$2a$')
        //Sends comparation result
        res.send(bcrypt.compareSync(psswd, hash))
    })
    connection.end()
}

console.log("Desde el controlador de login")

loginRequest.post('/login/action',login)

module.exports = loginRequest