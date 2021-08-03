const router = require("express").Router()
const multer = require('multer')
const multerConfig = require('../../config/multer')

const Post = require('../../app/models/post')

router.get('/posts', async (req, res) => {

	const posts = await Post.find()

	return res.json({ posts })

})

router.post('/post', multer(multerConfig).single('file'), async (req, res) => {

	const { originalname: name, size, key, location: url = "" } = req.file

	const post = await Post.create({
		name,
		size,
		key,
		url,
	})

	return res.send({ post })

})

router.delete('/remove-post/:key', async (req, res) => {

	const post = await Post.findOne({ key: req.params.key })

	await post.remove();

	return res.send();


})

module.exports = app => app.use('/auth', router)