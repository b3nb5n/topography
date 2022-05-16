import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ResourceHandlerContext } from '.'

export type GetResourcesResponse<T> = Response<Array<T>>

export const getResources = (
	ctx: ResourceHandlerContext
): RequestHandler<{}, GetResourcesResponse<any>> => {
	return async (_req, res) => {
		try {
			const resources = await ctx.collection.find({}).toArray()
			return res.send({ data: resources })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
