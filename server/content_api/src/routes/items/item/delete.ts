import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export interface DeleteItemResponseData {}

export type DeleteItemResponse = Response<DeleteItemResponseData>

interface DeleteItemParams {
	id: string
}

const deleteItem = (
	ctx: Context
): RequestHandler<DeleteItemParams, DeleteItemResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		// TODO: Authenticate request

		try {
			await ctx.prisma.item.delete({ where: { id } })
			return res.status(200).send({ data: {} })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default deleteItem
