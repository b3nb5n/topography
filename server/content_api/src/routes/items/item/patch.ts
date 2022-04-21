import { dataSchema, idSchema, itemSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../../..'

const patchItem = (ctx: Context): Handler => {
	return async (req, res) => {
		const idParseResult = idSchema.safeParse(req.params.id)
		if (!idParseResult.success) return res.sendStatus(400)
		const id = idParseResult.data

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
