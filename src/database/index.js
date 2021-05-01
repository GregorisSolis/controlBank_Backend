const mongoose = require('mongoose')

mongoose.connect('', 
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.Promise = global.Promise

module.exports = mongoose
