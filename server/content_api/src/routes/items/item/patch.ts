import { dataSchema, Response } from '@topography/comm'
import { itemSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export interface PatchItemResponseData {}

export type PatchItemResponse = Response<PatchItemResponseData>

interface PatchItemParams {
	id: string
}

const patchItem = (
	ctx: Context
): RequestHandler<PatchItemParams, PatchItemResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		const dataParseResult = dataSchema(itemSchema).deepPartial().safeParse(req.body)
		if (!dataParseResult.success) return res.sendStatus(400)
		const { data } = dataParseResult

		// TODO: Authenticate request

		try {
			await ctx.prisma.item.update({ where: { id }, data })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default patchItem
