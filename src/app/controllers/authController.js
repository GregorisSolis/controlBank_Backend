const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authConfig = require('../../config/auth')
const User = require('../models/user')

const router = express.Router()

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400,
	})}


//REGISTER USER
router.post('/register', async(req, res) =>{

	const { email } = req.body

	try{

		if(await User.findOne({ email })){
			return res.status(400).send({ error: 'User already exists.'})
		}

		const user = await User.create(req.body)

		user.password = undefined

		return res.send({
			user,
			token: generateToken({id: "Registration Failed."})
		})
	}
	catch(err){
		return res.status(400).send({ error: "Registration Failed." + err})
	}

})

//AUTHENTICAR USER
router.post('/authenticate', async (req, res) =>{

	const {email, password } = req.body

	const user = await User.findOne({ email }).select('+password')

	if(!user){
		return res.status(400).send({ error: 'User not found'})
	}

	if(!await bcrypt.compare(password, user.password)){
		return res.status(400).send({ error: 'Invalid password'})
	}

	user.password = undefined

	res.send({
		user,
		token: generateToken({ id: user.id})
	})
})

//MOSTRAR LA INFORMACION DEL USER
router.get('/info-user/:userId', async(req, res) =>{

	try{

		const infoUser = await User.findById(req.params.userId)

		return res.send({ infoUser })

	}catch(err){
		return res.status(400).send({ error: 'error loanding user info.'})
	}
})

//EDITAR INFORMACION DEL USUARIO
router.put('/edit-user/:id', async(req, res) =>{
		
	const _id = req.params.id
	const body = req.body

	try{

		const infoUserBD = await User.findByIdAndUpdate( _id, body, {new: true})

		res.json(infoUserBD)

	}catch(err){
		return res.status(400).send({ error: 'error edit user.' + err})
	}

})

module.exports = app => app.use('/auth', router)