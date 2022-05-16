import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type GetResourceResponse<T> = Response<T>

export const getResource = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
): RequestHandler<HandlerParams, GetResourceResponse<unknown>> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			const resource = await ctx.collection.findOne({ _id })
			if (!resource) res.status(404).send({ error: ERRORS.NOT_FOUND })
			return res.status(200).send({ data: resource })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
