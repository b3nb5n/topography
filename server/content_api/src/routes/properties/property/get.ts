import { Handler } from 'express'
import { Context } from '../..'

const getProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		try {
			const property = await ctx.prisma.property.findUnique({ where: { id } })
			return res.status(200).send({ resource: property })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getProperty
