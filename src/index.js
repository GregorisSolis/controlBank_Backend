const config = require('./config.js')
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/files", express.static(path.resolve(__dirname, "tmp", "uploads")));

require('./app/controllers/index')(app)

app.listen(config.PORT);
console.log('Servidor Activo OK');