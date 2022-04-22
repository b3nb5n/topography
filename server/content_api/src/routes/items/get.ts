import { Item } from '@prisma/client'
import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../..'

export type GetItemsResponseData = Item[]

export type GetItemsResponse = Response<GetItemsResponseData>

const getItems = (ctx: Context): RequestHandler<{}, GetItemsResponse> => {
	return async (_req, res) => {
		try {
			const items = await ctx.prisma.item.findMany()
			return res.status(200).send({ data: items })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default getItems
