import { dataSchema, Response } from '@topography/comm'
import { propertySchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import newMeta from '../../utils/new-meta'

export interface PostPropertyResponseData {
	id: string
}

export type PostPropertyResponse = Response<PostPropertyResponseData>

const postProperty = (ctx: Context): RequestHandler<{}, PostPropertyResponse> => {
	return async (req, res) => {
		const parseResult = dataSchema(propertySchema).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		// TODO: Authenticate request

		try {
			const id = uid(16)
			const meta = newMeta({ id, type: 'Property' })
			await ctx.prisma.property.create({
				data: { id, meta: { create: meta }, ...data },
			})

			return res.status(201).send({ data: { id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default postProperty
