import { ERRORS, Response, validateResourceId } from '@topography/common'
import { RequestHandler } from 'express'

export const validateResourceIdHandler: RequestHandler<
	{ [key: string]: string },
	Response
> = (req, res, next) => {
	const ids = Object.entries(req.params).filter(([key]) => /^id$|^\w+Id$/.test(key))
	console.log(req.params, ids)
	if (!ids.every(([_, value]) => validateResourceId(value)))
		res.status(400).send({ error: ERRORS.MISSING_ID })

	next()
}
