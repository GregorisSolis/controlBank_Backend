const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Transition = require('../models/transition')

const router = express.Router()

//CODIGO ENCARGADO DE QUE LAS TRANSITION SE HAGAN CON AUTH
router.use(authMiddleware)

//CREAR UNA TRANSITION
router.post('/new-transition', async (req, res) => {

	try {

		const transition = await Transition.create({ ...req.body, user: req.userId })

		return res.send({ transition })
	}
	catch (err) {
		return res.status(400).send({ error: 'Transition failed. - ' + err })
	}
})

//BUSCAR TYPETRANSITION ESPESIFICA POR USUARIO
router.get('/transitions/todos/:IDUSER', async (req, res) => {
	try {
		const trans = await Transition.find({ user: req.params.IDUSER })

		return res.send({ trans })
	}
	catch (err) {
		return res.status(400).send({ error: "error loading typeTransition. " })
	}
})

//BUSCAR TYPETRANSITION ESPESIFICA
router.get('/typeTransition/:type/:userId', async (req, res) => {
	try {
		const type = await Transition.find({ typeTransition: req.params.type, user: req.params.userId })

		return res.send({ type })
	}
	catch (err) {
		return res.status(400).send({ error: "error loading typeTransition. " })
	}
})


//MUESTRA TODAS LAS TRANSITION
router.get('/todos', async (req, res) => {

	try {

		const transitions = await Transition.find().populate('user')

		return res.send({ transitions })

	} catch (err) {
		return res.status(400).send({ error: "error loading transitions." + err })
	}

})

//EDITAR UNA Transition
router.put('/edit/:transitionId', async (req, res) => {

	try {

		const transition = await Transition.findOneAndUpdate(req.params.transitionId,
			{ ...req.body, user: req.userId }, { new: true })

		return res.send({ transition })

	} catch (err) {

		return res.status(400).send({ error: "error - GASTOS FIJOS - update" })

	}
})


//ELIMINAR UNA TRANSITION
router.delete('/romeve-transition/:transitionId', async (req, res) => {

	try {

		await Transition.findByIdAndRemove(req.params.transitionId)

		return res.send()

	} catch (err) {
		return res.status(400).send({ error: 'Error delete transition ' + err })
	}

})

module.exports = app => app.use('/trans', router)