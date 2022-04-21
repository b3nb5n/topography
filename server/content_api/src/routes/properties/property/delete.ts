import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../..'

const deleteProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

		// TODO: Authenticate request

		try {
			await ctx.prisma.property.delete({ where: { id } })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default deleteProperty
