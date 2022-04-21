import { Handler } from 'express'
import { Context } from '..'

const getItems = (ctx: Context): Handler => {
	return async (_req, res) => {
		try {
			const items = await ctx.prisma.item.findMany()
			return res.status(200).send({ resources: items })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getItems
