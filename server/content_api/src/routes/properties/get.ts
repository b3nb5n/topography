import { Handler } from 'express'
import { Context } from '../..'

const getProperties = (ctx: Context): Handler => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const properties = await ctx.prisma.property.findMany()
			return res.status(200).send(properties)
		} catch (err) {
			return res.status(500).send(err)
		}
	}
}

export default getProperties
