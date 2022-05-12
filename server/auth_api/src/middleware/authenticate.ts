import { Response } from '@topography/common'
import { RequestHandler } from 'express'

const authenticate: RequestHandler<{}, Response> = (_req, _res, next) => {
	// const auth = req.headers.authorization ?? ''
	// const token = /[\w-]+\.[\w-]+\.[\w-]+/.exec(auth)?.at(0) ?? ''
	// const parseResult = payloadShema.safeParse(jwt.decode(token))
	// if (!parseResult.success)
	// 	return res.status(401).send({ error: ERRORS.UNAUTHENTICATED })

	// res.locals.paylod = parseResult.data
	return next()
}

export default authenticate
