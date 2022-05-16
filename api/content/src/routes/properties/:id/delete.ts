import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { PropertyHandlerContext, PropertyHandlerParams } from '.'

export type DeletePropertyResponse = Response

const deletePropertyHandler = (
	ctx: PropertyHandlerContext
): RequestHandler<PropertyHandlerParams, DeletePropertyResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)

		try {
			await ctx.db.properties.deleteOne({ _id })
			return res.send({})
		} catch (error) {
			res.status(500).send({ error })
		}
	}
}

export default deletePropertyHandler
