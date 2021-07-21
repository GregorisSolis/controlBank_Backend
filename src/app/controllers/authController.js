const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

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

//EDITAR EL USER
router.put('/edit/:userId', async (req, res) => {

	try {

		const user = await User.findOneAndUpdate(req.params.userId,
			{ ...req.body}, { new: true })

		return res.send({ user })

	} catch (err) {

		return res.status(400).send({ error: "error score user" })

	}
})

//recuperar la contrasena - enviar emal para user
router.post('/forgot_password', async (req, res) => {
	const { email } = req.body

	try{

		const user = await User.findOne({ email })

		if(!user){
			return res.status(400).send({ error: "User not found"})
		}

		const token = crypto.randomBytes(20).toString('hex')
		
		const now = new Date()
		now.setHours(now.getHours() + 1)

		await User.findByIdAndUpdate(user.id, {
			'$set': {
				passwordResetToken: token,
				passwordResetExpires: now,
			}
		})
		
		mailer.sendMail({
			to: email,
			from: 'empresatuya@test.com',
			template: '/forgot_password',
			context: { token }

		}, (err) => {
			if (err) {
				console.log(err)
				return res.status(400).send({ error: 'Cannot send forgot password email'})
			}

			return res.send()
		})
	}

	
	catch(err){
		res.status(400).send({ error: 'error on forgot password, try again'})
	}
})

//recuperar la contrasena - enviando la nueva contrasena
router.post('/reset_password', async (req, res) => {

	const { email, token, password } = req.body

	try{

		const user = await User.findOne({ email })
		.select('+passwordResetToken passwordResetExpires')

		if (!user){
			return res.status(400).send({ error: "User not found" })
		}

		if (token !== user.passwordResetToken){
			return res.status(400).send({ error: "Token Invalid"})
		}

		const now = new Date()

		if (now > user.passwordResetExpires){
			return res.status(400).send({ error: "Token expired, generate a new one"})
		}

		user.password = password

		await user.save()

		res.send()
	}	
	catch (err){
		res.status(400).send({ error: 'Cannot reset password, try again'})
	}
})

module.exports = app => app.use('/auth', router)