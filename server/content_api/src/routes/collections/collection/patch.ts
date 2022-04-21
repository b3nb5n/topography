import { dataSchema } from '@topography/comm'
import { collectionSchema } from '@topography/schema'
import { Handler } from 'express'
import { Context } from '../../..'

const patchCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

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
