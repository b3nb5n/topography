import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type DeletePropertyResponseData = {}

export type DeletePropertyResponse = Response<DeletePropertyResponseData>

interface DeletePropertyParams {
	id: string
}

const deleteProperty = (
	ctx: Context
): RequestHandler<DeletePropertyParams, DeletePropertyResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send()

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
