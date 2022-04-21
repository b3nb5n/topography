import { Handler } from 'express'
import { Context } from '../..'

const getItem = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		try {
			const item = await ctx.prisma.item.findUnique({ where: { id } })
			return res.status(200).send({ resource: item })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}
export default getItem
