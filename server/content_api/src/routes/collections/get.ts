import { Collection } from '@prisma/client'
import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../..'

export type GetCollectionsResponseData = Collection[]

export type GetCollectionsResponse = Response<GetCollectionsResponseData>

const getCollections = (
	ctx: Context
): RequestHandler<{}, GetCollectionsResponse> => {
	return async (_req, res) => {
		// const parseResult = idSchema.safeParse(req.params.id)
		// if (!parseResult.success) return res.sendStatus(400)
		// const id = parseResult.data

		try {
			const data = await ctx.prisma.collection.findMany()
			return res.status(200).send({ data })
		} catch {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default getCollections
