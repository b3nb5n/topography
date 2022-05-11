import { errors, Response } from '@topography/comm'
import { validateResourceId } from '@topography/utils'
import { RequestHandler } from 'express'

const validateResourceIdHandler: RequestHandler<{ id?: unknown }, Response> = (
	req,
	res,
	next
) => {
	if (validateResourceId(req.params.id)) return next()
	return res.status(400).send({ error: errors.INVALID_ID })
}

export default validateResourceIdHandler
