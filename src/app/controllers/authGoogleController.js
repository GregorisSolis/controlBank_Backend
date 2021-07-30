const express = require('express')
const jwt = require('jsonwebtoken')

const config = require('../../config.js')
const User = require('../models/user')
const UserGoogle = require('../models/userGoogle')

const router = express.Router()

function generateToken(params = {}) {
	return jwt.sign(params, config.SECRET_APP, {
		expiresIn: 86400,
	})
}


//REGISTER USER
router.post('/google/register', async (req, res) => {

	const { email } = req.body

	try {

		if (await UserGoogle.findOne({ email }) || await User.findOne({ email })) {
			return res.status(400).send({ error: 'User already exists.' })
		}

		const user = await UserGoogle.create(req.body)

		return res.send({
			user,
			token: generateToken({ id: "Registration Failed." })
		})
	}
	catch (err) {
		return res.status(400).send({ error: "Registration Failed." + err })
	}

})

//INFO USER auth
router.get('/google/info/:googleId', async (req, res) => {

	try {
		const infoProfile = await UserGoogle.findOne({ googleId: req.params.googleId })

		return res.send({
			infoProfile,
			token: generateToken({ id: infoProfile.id })
		})

	}
	catch (err) {
		return res.status(400).send({ error: 'error loanding user info.' })

		console.log(err)
	}
})

//INFO USER profile
router.get('/google/profile/:googleId', async (req, res) => {

	const ID = req.params.googleId

	try {
		const infoProfile = await UserGoogle.findOne({ _id: req.params.googleId })

		return res.send({
			infoProfile,
			token: generateToken({ id: infoProfile.id })
		})

	}
	catch (err) {
		return res.status(400).send({ error: 'error loanding user info.' })

		console.log(err)
	}
})

//EDITAR LA DATA DEL USERGOOGLE

router.put('/google/info-edit/:googleId', async (req, res) => {

	const body = req.body

	try {

		const infoProfile = await UserGoogle.findByIdAndUpdate(req.params.googleId, body, { new: true })

		res.json(infoProfile)

	}
	catch (err) {
		return res.status(400).json('Error update userGoogle ' + err)
	}

})

module.exports = app => app.use('/auth', router)