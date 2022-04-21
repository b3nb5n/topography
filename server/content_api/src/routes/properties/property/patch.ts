import { dataSchema } from '@topography/comm'
import { propertySchema } from '@topography/schema'
import { Handler } from 'express'
import { Context } from '../..'

const patchProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.sendStatus(400)

		const dataParseResult = dataSchema(propertySchema)
			.deepPartial()
			.safeParse(req.body)
		if (!dataParseResult.success) return res.sendStatus(400)
		const { data } = dataParseResult

		// TODO: Authenticate request

		try {
			await ctx.prisma.property.update({ where: { id }, data })
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.sendStatus(200)
	}
}

export default patchProperty
