import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import Resource, { resourceDataSchemas } from '../../models/resource'
import getContext from '../../utils/get-context'

export type PostResourceResponse = Response<{ id: string }>

const postResource: RequestHandler<{}, PostResourceResponse> = async (req, res) => {
	try {
		const ctx = getContext(res)
		const schema = resourceDataSchemas[ctx.resourceType]
		const parseResult = schema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })

		const resource = new Resource({ data: parseResult.data })

		// TODO: save resource to db

		return res.status(201).send({ data: { id: resource.id } })
	} catch (error) {
		return res.status(500).send({ error })
	}
}

export default postResource
