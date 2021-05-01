const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../../config/auth')
const User = require('../models/user')
const UserGoogle = require('../models/userGoogle')

const router = express.Router()

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400,
	})}


//REGISTER USER
router.post('/register', async(req, res) =>{

	const { email } = req.body

	try{

		if(await UserGoogle.findOne({ email })){
			if(User.findOne({ email })){
				return res.status(400).send({ error: 'User already exists.'})
			}
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

//AGREGAR SCORE AL USER
router.put('/edit/:userId', async (req, res) => {

	try {

		const user = await User.findOneAndUpdate(req.params.userId,
			{ ...req.body}, { new: true })

		return res.send({ user })

	} catch (err) {

		return res.status(400).send({ error: "error score user" })

	}
})


module.exports = app => app.use('/auth', router)