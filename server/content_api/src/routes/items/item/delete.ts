import { Handler } from 'express'
import { Context } from '../../..'

const deleteItem = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		// TODO: Authenticate request

		try {
			await ctx.prisma.property.delete({ where: { id } })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default deleteItem
