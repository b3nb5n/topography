import { Handler } from 'express'
import validateResourceId from '../utils/validate-resource-id'

const validateResourceIdHandler: Handler = (req, res, next) => {
	console.log('middleware')
	if (validateResourceId(req.params.id)) return next()
	console.log('middleware error')
	return res.sendStatus(400)
}

export default validateResourceIdHandler
