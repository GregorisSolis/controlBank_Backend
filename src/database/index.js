const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gregoBank:32perXros27calieZntes45@cluster0.hljav.mongodb.net/Controlbank', 
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.Promise = global.Promise

module.exports = mongoose

