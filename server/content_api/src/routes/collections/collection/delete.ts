import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../../..'

const deleteCollection = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

		try {
			await ctx.prisma.collection.delete({ where: { id } })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default deleteCollection
