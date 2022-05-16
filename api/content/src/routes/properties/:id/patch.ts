import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { PropertyHandlerContext, PropertyHandlerParams } from '.'
import { propertyDataSchema } from '../../../models'

export type PatchPropertyResponse = Response

export const patchPropertyHandler = (
	ctx: PropertyHandlerContext
): RequestHandler<PropertyHandlerParams, PatchPropertyResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)
		const parseResult = propertyDataSchema.partial().safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			await ctx.db.properties.updateOne({ _id }, { data })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default patchPropertyHandler
