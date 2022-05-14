import { ERRORS, Response, validateResourceId } from '@topography/common'
import { RequestHandler } from 'express'

const validateResourceIdHandler: RequestHandler<{ id?: unknown }, Response> = (
	req,
	res,
	next
) => {
	if (validateResourceId(req.params.id)) return next()
	return res.status(400).send({ error: ERRORS.MISSING_ID })
}

export default validateResourceIdHandler
