import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { payloadShema } from '../utils/payload'

const authenticate: RequestHandler<{}, Response> = (req, res, next) => {
	const auth = req.headers.authorization ?? ''
	const token = /[\w-]+\.[\w-]+\.[\w-]+/.exec(auth)?.at(0) ?? ''

	try {
		res.locals.payload = payloadShema.parse(jwt.decode(token))
		next()
	} catch {
		return res.status(401).send({ error: errors.UNAUTHENTICATED })
	}
}

export default authenticate
