import { Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { PropertiesHandlerContext } from '.'
import { propertyDataSchema } from '../../models'

export type PostPropertyResponse = Response<{ id: string }>

const postPropertyHandler = (
	ctx: PropertiesHandlerContext
): RequestHandler<{}, PostPropertyResponse> => {
	return async (req, res) => {
		const parseResult = propertyDataSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const property = new Resource({ data: parseResult.data })

		try {
			await ctx.db.properties.insertOne(property.toBson())
		} catch (error) {
			return res.status(500).send({ error })
		}

		return res.status(201).send({ data: { id: property.id } })
	}
}

export default postPropertyHandler
