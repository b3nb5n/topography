import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { PropertiesHandlerContext } from '.'
import { PropertyShape } from '../../models'

export type GetPropertiesResponse = Response<PropertyShape[]>

const getPropertiesHandler = (
	ctx: PropertiesHandlerContext
): RequestHandler<{}, GetPropertiesResponse> => {
	return async (_req, res) => {
		try {
			const properties = await ctx.db.properties.find({}).toArray()
			return res.send({ data: properties })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getPropertiesHandler
