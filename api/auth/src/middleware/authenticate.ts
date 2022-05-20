import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { decode } from 'jsonwebtoken'
import { payloadShema } from '../utils/payload'

const authenticate: RequestHandler<{}, Response> = (req, res, next) => {
	const token = req.headers.authorization?.slice(7) ?? ''
	const parseResult = payloadShema.safeParse(decode(token))
	if (!parseResult.success)
		return res.status(401).send({ error: ERRORS.UNAUTHENTICATED })

	res.locals.paylod = parseResult.data
	return next()
}

export default authenticate
