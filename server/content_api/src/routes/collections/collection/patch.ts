import { collectionSchema, dataSchema, idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../..'

const patchCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const idParseResult = idSchema.safeParse(req.params.id)
		if (!idParseResult.success) return res.sendStatus(400)
		const id = idParseResult.data

		const dataParseResult = dataSchema(collectionSchema)
			.deepPartial()
			.safeParse(req.body)
		if (!dataParseResult.success) return res.sendStatus(400)
		const { data } = dataParseResult

		try {
			await ctx.prisma.collection.update({ where: { id }, data })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default patchCollection
