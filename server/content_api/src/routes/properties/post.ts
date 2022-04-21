import { dataSchema } from '@topography/comm'
import { propertySchema } from '@topography/schema'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import newMeta from '../../utils/new-meta'

const postProperty = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = dataSchema(propertySchema).safeParse(req.body)
		if (!parseResult.success) return res.status(400).send(parseResult.error)
		const { data } = parseResult

		// TODO: Authenticate request

		try {
			const id = uid(16)
			const meta = newMeta({ id, type: 'Property' })
			await ctx.prisma.property.create({
				data: { id, meta: { create: meta }, ...data },
			})

			return res.status(201).send({ resource: { id } })
		} catch (err) {
			return res.status(500).send(err)
		}
	}
}

export default postProperty
