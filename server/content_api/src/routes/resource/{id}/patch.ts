import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'
import { resourceDataSchemas } from '../../../models/resource'
import getContext from '../../../utils/get-context'

export type PatchResourceResponse = Response

const patchResource: RequestHandler<HandlerParams, PatchResourceResponse> = (
	req,
	res
) => {
	const { id } = req.params
	if (!id) return res.status(400).send({ error: errors.INVALID_ID })

	try {
		const ctx = getContext(res)
		const schema = resourceDataSchemas[ctx.resourceType]
		const parseResult = schema.partial().safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })

		// TODO: update resource in db

		return res.send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}

export default patchResource
