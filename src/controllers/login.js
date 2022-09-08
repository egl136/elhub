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

const login = async (req, res)=>{
    //Get post from request
    const mail = req.body.usuinput
    const psswd = req.body.pasinput
    //Connect to database
    //await connection.connect()
    const query = "SELECT * FROM Users WHERE user_mail = '"+mail+"'"
    console.log(query)
    let hash = ""
    var respuesta = {
        failed: true,
        error_msg: "",
        user: {
            id: "",
            mail: "",
            name: "",
            lname: "",
            tipo: 0,
            telefono: "",
            sexo: "",
            empresa: "",
            rfc: "",
            pais: "",
            ciudad: ""
        }
    }
    connection.query(query, (err, results, fields) => {
        if (err) respuesta.error_msg = err
        if (results.length!==1) {
            respuesta.error_msg = "Correo no encontrado"
            console.log(JSON.stringify(respuesta))
            res.json(respuesta)
        }
        //As hashes were generated with php, they use $2y$ prefix, so it is
        //just exchanged to $2a$ prefix
        else{
            hash = results[0].user_hash.replace('$2y$', '$2a$')
            //Validates passwd with hashed one
            let matched = bcrypt.compareSync(psswd, hash)
            if(matched){
                respuesta.user.id = results[0].user_id
                respuesta.user.mail = results[0].user_mail
                respuesta.user.telefono = results[0].user_tel
                respuesta.user.tipo = results[0].user_type
                respuesta.user.name = results[0].user_name
                respuesta.user.lname = results[0].user_lname
                console.log(respuesta.user.mail)
                let table = "Normal"
                if(results[0].tipo) table = "Empresas"
                const getUser = "SELECT * FROM "+table+" WHERE user_id='"+results[0].user_id+"'"
                console.log(getUser)
                connection.query(getUser, (err, resu, fields) => {
                    if (err) console.log(err)
                    if (resu.length!==1) respuesta.error_msg = "Error con la integridad de los datos."
                    else{
                        if(table === "Normal"){
                            respuesta.user.sexo = resu[0].sexo
                            console.log(respuesta.user.sexo)
                        }else{
                            respuesta.user.empresa = resu[0].emp_id
                            respuesta.user.rfc = resu[0].emp_rfc
                            respuesta.user.pais = resu[0].emp_country
                            respuesta.user.ciudad = resu[0].emp_city
                        }
                        respuesta.failed = false
                        res.json(respuesta)
                        console.log(JSON.stringify(respuesta))
                    }
                })
            }else{
                respuesta.error_msg = "Contraseña Incorrecta"
                res.json(respuesta)
            }
        }
    })
    //res.json(respuesta)
    //connection.end()
}

console.log("Desde el controlador de login")

loginRequest.post('/login/action',login)

module.exports = loginRequest