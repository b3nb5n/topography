import { Property } from '@prisma/client'
import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../..'

export type GetPropertiesResponseData = Property[]

export type GetPropertiesResponse = Response<GetPropertiesResponseData>

const getProperties = (ctx: Context): RequestHandler<{}, GetPropertiesResponse> => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const data = await ctx.prisma.property.findMany()
			return res.status(200).send({ data })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getProperties
