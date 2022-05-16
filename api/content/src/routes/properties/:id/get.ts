import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { PropertyHandlerContext, PropertyHandlerParams } from '.'
import { PropertyShape } from '../../../models'

export type GetPropertyResponse = Response<PropertyShape>

const getPropertyHandler = (
	ctx: PropertyHandlerContext
): RequestHandler<PropertyHandlerParams, GetPropertyResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)

		try {
			const property = await ctx.db.properties.findOne({ _id })
			if (!property) return res.status(400).send({ error: ERRORS.NOT_FOUND })
			return res.send({ data: property })
		} catch (error) {
			res.status(500).send({ error })
		}
	}
}

export default getPropertyHandler
