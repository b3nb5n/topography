import { dataSchema, idSchema, propertySchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../../..'

const patchProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const idParseResult = idSchema.safeParse(req.params.id)
		if (!idParseResult.success) return res.sendStatus(400)
		const id = idParseResult.data

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
