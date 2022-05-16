import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type PatchResourceResponse = Response

export const patchResource = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
): RequestHandler<HandlerParams, PatchResourceResponse> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			const parseResult = ctx.dataSchema.partial().safeParse(req.body)
			if (!parseResult.success)
				return res.status(400).send({ error: parseResult.error })

			await ctx.collection.updateOne({ _id }, { data: parseResult.data })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
