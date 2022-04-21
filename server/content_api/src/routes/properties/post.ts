import { dataSchema } from '@topography/comm'
import { propertySchema } from '@topography/schema'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '..'
import newMeta from '../../utils/new-meta'

const postProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		console.log('creating property:', req.body)
		const parseResult = dataSchema(propertySchema).safeParse(req.body)
		if (!parseResult.success) return res.status(400).send(parseResult.error)
		const { data } = parseResult

		// TODO: Authenticate request

		const id = uid(16)

		try {
			const meta = newMeta({ id, type: 'Property' })
			await ctx.prisma.property.create({
				data: { id, meta: { create: meta }, ...data },
			})
		} catch (err) {
			return res.sendStatus(500)
		}

		return res.status(201).send({ resource: { id } })
	}
}

export default postProperty
