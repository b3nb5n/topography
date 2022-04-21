import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../..'

const getProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

		try {
			const property = await ctx.prisma.property.findUnique({ where: { id } })
			return res.status(200).send({ resource: property })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getProperty
