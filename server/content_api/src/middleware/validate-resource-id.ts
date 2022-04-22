import { validateResourceId } from '@topography/utils'
import { Handler } from 'express'

const validateResourceIdHandler: Handler = (req, res, next) => {
	if (validateResourceId(req.params.id)) return next()
	return res.sendStatus(400)
}

export default validateResourceIdHandler
