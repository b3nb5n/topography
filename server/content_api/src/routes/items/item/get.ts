import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../../..'

const getItem = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

		try {
			const item = await ctx.prisma.item.findUnique({ where: { id } })
			return res.status(200).send({ resource: item })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}
export default getItem
