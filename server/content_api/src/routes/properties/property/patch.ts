import { dataSchema, errors, Response } from '@topography/comm'
import { propertySchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export interface PatchPropertyResponseData {}

export type PatchPropertyResponse = Response<PatchPropertyResponseData>

interface PatchPropertyParams {
	id: string
}

const patchProperty = (
	ctx: Context
): RequestHandler<PatchPropertyParams, PatchPropertyResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		const dataParseResult = dataSchema(propertySchema)
			.deepPartial()
			.safeParse(req.body)
		if (!dataParseResult.success)
			return res.status(400).send({ error: dataParseResult.error })
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
