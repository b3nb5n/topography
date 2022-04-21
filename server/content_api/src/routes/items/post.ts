import { dataSchema, itemSchema, newMeta } from '@topography/utils'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '..'

const postItem = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = await dataSchema(itemSchema).safeParseAsync(req.body)
		if (!parseResult.success) return res.sendStatus(400)
		const { data } = parseResult

		// TODO: Authenticate request

		const id = uid(16)
		const meta = newMeta({ id, type: 'Item' })

		try {
			await ctx.prisma.item.create({
				data: {
					id,
					meta: { create: meta },
					collection: { connect: { id: data.collectionId } },
				},
			})
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.status(201).send({ resource: { id } })
	}
} 
export default postItem
