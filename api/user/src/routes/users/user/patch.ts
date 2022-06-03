import { flattenDocument } from '@topography/api'
import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'
import { userDataSchema } from '../../../models'

export type PatchUserResponse = Response

interface PatchUserParams {
	id: string
}

export const patchUserHandler = (
	ctx: HandlerContext
): RequestHandler<PatchUserParams, PatchUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid

		const parseResult = userDataSchema
			.omit({ roleId: true, email: true, password: true })
			.partial()
			.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult
		if (Object.keys(data).length === 0) return res.send({})

		try {
			const result = await ctx.db.users.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: flattenDocument({ data }) }
			)

			if (!result.acknowledged) throw ERRORS.UNKNOWN
			if (!result.modifiedCount) res.status(404).send({ error: ERRORS.NOT_FOUND })

			return res.send({})
		} catch (error) {
			console.log(error)
			return res.status(500).send({ error })
		}
	}
}
