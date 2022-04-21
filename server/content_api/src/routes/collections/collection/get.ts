import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../..'

const getCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

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
