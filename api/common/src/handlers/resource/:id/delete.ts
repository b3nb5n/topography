import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type DeleteResourceResponse = Response

export const deleteResourceHandler = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
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
