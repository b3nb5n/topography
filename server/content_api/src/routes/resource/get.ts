import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import getContext from '../../utils/get-context'

export type GetResourcesResponse<T> = Response<Array<T>>

const getResources: RequestHandler<{}, GetResourcesResponse<any>> = (_req, res) => {
	try {
		const ctx = getContext(res)

		// TODO: get resources from the db

		return res.send({ data: [] })
	} catch (error) {
		return res.status(500).send({ error })
	}
}

export default getResources
