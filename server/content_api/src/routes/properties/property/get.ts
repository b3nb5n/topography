import { Property } from '@prisma/client'
import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type GetPropertyResponseData = Property

export type GetPropertyRepsponse = Response<GetPropertyResponseData>

interface GetPropertyParams {
	id: string
}

const getProperty = (
	ctx: Context
): RequestHandler<GetPropertyParams, GetPropertyRepsponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		try {
			const data = await ctx.prisma.property.findUnique({ where: { id } })
			if (!data) return res.status(404).send({ error: errors.NOT_FOUND })
			return res.status(200).send({ data })
		} catch (err) {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default getProperty
