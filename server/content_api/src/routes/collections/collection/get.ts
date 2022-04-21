import { Handler } from 'express'
import { Context } from '../..'

const getCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		try {
			const collection = await ctx.prisma.collection.findUnique({ where: { id } })
			if (!collection) return res.sendStatus(404)
			return res.status(200).send({ resource: collection })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getCollection
