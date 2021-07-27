const routes = require("express").Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Post = require('./app/models/post')

routes.post('/post', multer(multerConfig).single('file'), async (req, res) =>{

	const { originalname: name, size, filename: key } = req.file

	const post = await Post.create({
		name,
		size,
		key,
		url: "",
	})

	return res.send({post})

})

module.exports = routes