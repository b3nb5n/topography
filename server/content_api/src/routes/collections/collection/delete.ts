import { Handler } from 'express'
import { Context } from '../..'

const deleteCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		try {
			await ctx.prisma.collection.delete({ where: { id } })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default deleteCollection
