import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type DeleteResourceResponse = Response

export const deleteResource = (
	ctx: ResourceHandlerContext
): RequestHandler<HandlerParams, DeleteResourceResponse> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			await ctx.collection.deleteOne({ _id })
			return res.status(200).send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
