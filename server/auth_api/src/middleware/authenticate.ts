import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { payloadShema } from '../utils/payload'

const authenticate: RequestHandler<{}, Response> = (req, res, next) => {
	const auth = req.headers.authorization ?? ''
	const token = /[\w-]+\.[\w-]+\.[\w-]+/.exec(auth)?.at(0) ?? ''
	const parseResult = payloadShema.safeParse(jwt.decode(token))
	if (!parseResult.success)
		return res.status(401).send({ error: errors.UNAUTHENTICATED })
	
	res.locals.paylod = parseResult.data
	return next()
}

export default authenticate
