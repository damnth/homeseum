const express = require('express')
const app = express()
const port = 3010
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser')
const requestIp = require('request-ip');
const cors = require('cors')

app.use(cors({
    origin: ['*'],
    AccessControlAllowMethods: 'POST, GET, OPTIONS, PUT, DELETE',
    AccessControlAllowHeaders: 'Content-Type, Origin, Authorization',
    credentials: true
}))
app.options('*', cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}));

let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'homeseum',
    multipleStatements: true
})

function query(sql) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (e, r, f) {
            if (e) {
                console.log(e);
                resolve(false);
            }
            else {
                resolve(r);
            }
        });
    });
}

function get_ip_address(req) {
    let ip = requestIp.getClientIp(req)
    if(ip.includes(":")){
        ip = "localhost"
    }
    return ip
}

function queryInsertObject(table,object) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO '+table+' SET ?',object, function (e, r, f) {
            if (e) {
                console.log(e);
                resolve(false);
            }
            else {
                resolve(r);
            }
        });
    });
}

app.get('/getSession', (req, res) => {
    let ip = get_ip_address(req)
    console.log(ip)
    res.json(ip)
})

app.get('/register', (req, res) => {
    res.json(true)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))