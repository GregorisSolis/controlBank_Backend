const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors')
const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


require('./app/controllers/index')(app)

app.use(require('./routes'));

app.listen(process.env.PORT || 3030)
console.log('Servidor Activo OK')