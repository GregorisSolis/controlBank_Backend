const config = require('../config.js');
const mongoose = require('mongoose')

mongoose.connect(config.DATA_BASE_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = global.Promise

module.exports = mongoose
