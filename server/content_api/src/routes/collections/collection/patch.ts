import { dataSchema, errors, Response } from '@topography/comm'
import { collectionSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export interface PatchCollectionRespnseData {}

export type PatchCollectionResponse = Response<PatchCollectionRespnseData>

interface PatchCollectionParams {
	id: string
}

const patchCollection = (
	ctx: Context
): RequestHandler<PatchCollectionParams, PatchCollectionResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		const dataParseResult = dataSchema(collectionSchema)
			.deepPartial()
			.safeParse(req.body)
		if (!dataParseResult.success)
			return res.status(400).send({ error: dataParseResult.error })
		const { data } = dataParseResult

		try {
			await ctx.prisma.collection.update({ where: { id }, data })
			return res.status(200).send({ data: {} })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default patchCollection
