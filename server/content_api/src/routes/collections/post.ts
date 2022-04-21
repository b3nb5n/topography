import { dataSchema } from '@topography/comm'
import { collectionSchema } from '@topography/schema'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import newMeta from '../../utils/new-meta'

const postCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = dataSchema(collectionSchema).safeParse(req.body)
		if (!parseResult.success) return res.sendStatus(400)
		const { data } = parseResult

		// TODO: authenticate request sender

		const id = uid(16)
		const meta = newMeta({ id, type: 'Collection' })

		try {
			await ctx.prisma.collection.create({
				data: {
					id,
					meta: { create: meta },
					property: { connect: { id: data.propertyId } },
					schema: data.schema ?? {},
				},
			})
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.status(201).send({ resource: { id } })
	}
}

export default postCollection
