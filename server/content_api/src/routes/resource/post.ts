import { Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ResourceHandlerContext } from '.'

export type PostResourceResponse = Response<{ id: string }>

const postResource = (
	ctx: ResourceHandlerContext
): RequestHandler<{}, PostResourceResponse> => {
	return async (req, res) => {
		try {
			const parseResult = ctx.dataSchema.safeParse(req.body)
			if (!parseResult.success)
				return res.status(400).send({ error: parseResult.error })

			const resource = new Resource({ data: parseResult.data })

			// TODO: save resource to db

			return res.status(201).send({ data: { id: resource.id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default postResource
