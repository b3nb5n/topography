import { Item } from '@prisma/client'
import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type GetItemResponseData = Item

export type GetItemResponse = Response<GetItemResponseData>

interface GetItemParams {
	id: string
}

const getItem = (ctx: Context): RequestHandler<GetItemParams, GetItemResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		try {
			const data = await ctx.prisma.item.findUnique({ where: { id } })
			if (!data) return res.status(404).send({ error: errors.NOT_FOUND })
			return res.status(200).send({ data })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getItem
