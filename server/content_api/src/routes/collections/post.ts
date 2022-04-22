import { dataSchema, errors, Response } from '@topography/comm'
import { collectionSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import newMeta from '../../utils/new-meta'

export interface PostCollectionResponseData {
	id: string
}

export type PostCollectionResponse = Response<PostCollectionResponseData>

const postCollection = (
	ctx: Context
): RequestHandler<{}, PostCollectionResponse> => {
	return async (req, res) => {
		const parseResult = dataSchema(collectionSchema).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		// TODO: authenticate request sender

		try {
			const id = uid(16)
			const meta = newMeta({ id, type: 'Collection' })
			await ctx.prisma.collection.create({
				data: {
					id,
					meta: { create: meta },
					property: { connect: { id: data.propertyId } },
					schema: data.schema ?? {},
				},
			})

			return res.status(201).send({ data: { id } })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default postCollection
