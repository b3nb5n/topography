import { dataSchema, errors, Response } from '@topography/comm'
import { itemSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import newMeta from '../../utils/new-meta'

export interface PostItemResponseData {
	id: string
}

export type PostItemResponse = Response<PostItemResponseData>

const postItem = (ctx: Context): RequestHandler<{}, PostItemResponse> => {
	return async (req, res) => {
		const parseResult = dataSchema(itemSchema).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		// TODO: Authenticate request

		try {
			const id = uid(16)
			const meta = newMeta({ id, type: 'Item' })
			await ctx.prisma.item.create({
				data: {
					id,
					meta: { create: meta },
					collection: { connect: { id: data.collectionId } },
				},
			})

			return res.status(201).send({ data: { id } })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}
export default postItem
