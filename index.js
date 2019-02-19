const express = require('express')
const app = express()
const port = 3010
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser')
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


app.get('/register', (req, res) => {
    res.json(true)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))