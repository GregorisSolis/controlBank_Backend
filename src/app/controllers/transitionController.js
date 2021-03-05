const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Transition = require('../models/transition')

const router = express.Router()

//CODIGO ENCARGADO DE QUE LAS TRANSITION SE HAGAN CON AUTH
router.use(authMiddleware)

//CREAR UNA TRANSITION
router.post('/new-transition', async (req, res) => {

	try {

		const transition = await Transition.create(req.body)

		return res.send({ transition })
	}
	catch (err) {
		return res.status(400).send({ error: 'Transition failed. - ' + err })
	}
})

//MUESTRA TODAS LAS TRANSITION
router.get('/todos', async (req, res) => {

	try {

		const transitions = await Transition.find()

		return res.send({ transitions })

	} catch (err) {
		return res.status(400).send({ error: "error loading transitions." })
	}

})

//TYPETRANSITION "Gastos"
router.get('/typeTransition/Gastos', async (req, res) => {

	try {

		const typeTransition = await Transition.find({ typeTransition: /Gasto/ })

		return res.send({ typeTransition })

	} catch (err) {
		return res.status(400).send({ error: "error loading typeTransition - Gastos." })
	}
})

//TYPETRANSITION "Gastos Fijos"
router.get('/typeTransition/GastosFijos', async (req, res) => {

	try {

		const typeTransition = await Transition.find({ typeTransition: /GastosFijos/ })

		return res.send({ typeTransition })

	} catch (err) {
		return res.status(400).send({ error: "error loading typeTransition - Gastos Fijos." })
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