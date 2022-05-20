import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'
import { flattenDocument } from '../../../utils/flatten-document'

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

			const result = await ctx.collection.updateOne(
				{ _id },
				{ $set: flattenDocument({ data: parseResult.data }) }
			)

			if (!result.acknowledged) throw ERRORS.UNKNOWN
			if (!result.modifiedCount) res.status(404).send({ error: ERRORS.NOT_FOUND })

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
