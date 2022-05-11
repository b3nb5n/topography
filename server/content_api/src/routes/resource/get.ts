import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { ResourceHandlerContext } from '.'

export type GetResourcesResponse<T> = Response<Array<T>>

const getResources = (
	_ctx: ResourceHandlerContext
): RequestHandler<{}, GetResourcesResponse<any>> => {
	return (_req, res) => {
		try {
			// TODO: get resources from the db

			return res.send({ data: [] })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getResources
