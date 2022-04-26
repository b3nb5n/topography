import { errors, Response } from '@topography/comm'
import { validateResourceId } from '@topography/utils'
import { RequestHandler } from 'express'

const meRedirect: RequestHandler<{}, Response> = (req, res) => {
	const id = res.locals.payload?.uid
	if (!validateResourceId(id))
		return res.status(401).send({ error: errors.INVALID_ID })

	const url = new URL(req.url, `http://${req.hostname}`)
	url.pathname.replace(/\/me\/?/, `/${id}/`)
	res.redirect(url.toString())
}

export default meRedirect
