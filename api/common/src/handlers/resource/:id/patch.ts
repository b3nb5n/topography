import { ERRORS, Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type PatchResourceResponse = Response

export const patchResourceHandler = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
): RequestHandler<HandlerParams, PatchResourceResponse> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			const parseResult = ctx.dataSchema.partial().safeParse(req.body)
			if (!parseResult.success)
				return res.status(400).send({ error: parseResult.error })

			const doc = await ctx.collection.findOne({ _id })
			if (!doc) return res.status(404).send({ error: ERRORS.NOT_FOUND })

			const resource = new Resource(doc)
			resource.update(parseResult.data)

			await ctx.collection.updateOne({ _id }, { $set: resource.toBson() })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
