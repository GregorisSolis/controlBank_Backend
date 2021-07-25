const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true, select: false},
	createdAt: {type: Date, default: Date.now},
	ahorros:{type: String, initialize: 0},
	salario: {type: String, initialize: 0},
	passwordResetToken: { type: String, select: false},
	passwordResetExpires: { type: Date, select: false } 
})

UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 10)
	this.password = hash

	next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User