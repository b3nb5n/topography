import { dataSchema, newMeta, propertySchema } from '@topography/utils'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'

const postProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = dataSchema(propertySchema).safeParse(req.body)
		if (!parseResult.success) return res.send(400)
		const { data } = parseResult

		// TODO: Authenticate request

		const id = uid(16)
		const meta = newMeta({ id, type: 'Property' })

		try {
			await ctx.prisma.property.create({
				data: {
					id,
					meta: { create: meta },
					...data,
				},
			})
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.status(201).send({ resource: { id } })
	}
}

export default postProperty
