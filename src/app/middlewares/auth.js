const jwt = require('jsonwebtoken')
const config = require('../../config.js')

module.exports = (req, res, next) => {

	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).send({ error: 'No token provided.' })
	}

	const parts = authHeader.split(' ')

	if (!parts.length === 2) {
		return res.status(401).send({ error: 'token error' })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).send({ error: "Token malformated" })
	}

	jwt.verify(token, config.SECRET_APP, (err, decoded) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' })
		}

		req.userId = decoded.id
		return next()
	})
}