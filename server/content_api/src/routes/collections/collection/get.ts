import { Collection } from '@prisma/client'
import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type GetCollectionResponseData = Collection

export type GetCollectionResponse = Response<GetCollectionResponseData>

interface GetCollectionParams {
	id: string
}

const getCollection = (
	ctx: Context
): RequestHandler<GetCollectionParams, GetCollectionResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		try {
			const data = await ctx.prisma.collection.findUnique({ where: { id } })
			if (!data) return res.status(404).send({ error: errors.NOT_FOUND })
			return res.status(200).send({ data })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default getCollection
