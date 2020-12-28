const mongoose = require('../../database')

const TransitionSchema = new mongoose.Schema({
	valor:{ type: String, required: true },
	typeTransition:{ type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	idUser:{ type: String, required: true },
	mesValue:{ type: String, required: true },
	description: {type: String, required: true}
})

const Transition = mongoose.model('Transition', TransitionSchema)

module.exports = Transition