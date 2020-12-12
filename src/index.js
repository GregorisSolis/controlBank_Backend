var express = require('express');
const bodyParser = require('body-parser')
var app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./app/controllers/index')(app)

app.listen(3000, function() {
  console.log('escutando na porta 3000!');
});