import { Handler } from 'express'
import { Context } from '../..'

const getCollections = (ctx: Context): Handler => {
	return async (_req, res) => {
		// const parseResult = idSchema.safeParse(req.params.id)
		// if (!parseResult.success) return res.sendStatus(400)
		// const id = parseResult.data

		try {
			const collections = await ctx.prisma.collection.findMany()
			return res.status(200).send({ resources: collections })
		} catch {
			return res.sendStatus(500)
		}
	}
}

export default getCollections
