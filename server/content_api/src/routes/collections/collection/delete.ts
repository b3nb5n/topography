import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export interface DeleteCollectionResponseData {}

export type DeleteCollectionResponse = Response<DeleteCollectionResponseData>

interface DeleteCollectionParams {
	id: string
}

const deleteCollection = (
	ctx: Context
): RequestHandler<DeleteCollectionParams, DeleteCollectionResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		try {
			await ctx.prisma.collection.delete({ where: { id } })
			return res.status(200).send({ data: {} })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default deleteCollection
