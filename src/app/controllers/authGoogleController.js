const express = require('express')
const User = require('../models/user')
const UserGoogle = require('../models/userGoogle')

const router = express.Router()

//REGISTER USER
router.post('/google/register', async(req, res) =>{

	const { email } = req.body

	try{

		if(await User.findOne({ email })){
			if(UserGoogle.findOne({ email })){
				return res.status(400).send({ error: 'User already exists.'})
			}
		}

		const user = await UserGoogle.create(req.body)

		return res.status(200).send(user)
	}
	catch(err){
		return res.status(400).send({ error: "Registration Failed." + err})
	}

})

//INFO USER
router.get('/google/info/:googleId', async(req, res) => {

		const ID = req.params.googleId

	try{
		const infoProfile = await UserGoogle.find({ googleId: req.params.googleId})

		return res.send({ infoProfile })
	}
	catch(err){
		return res.status(400).send({ error: 'error loanding user info.'})

		console.log(err)
	}
})

module.exports = app => app.use('/auth', router)