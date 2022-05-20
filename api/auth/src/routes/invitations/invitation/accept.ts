import { ERRORS, Resource, Response } from '@topography/common'
import { hashSync } from 'bcrypt'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'
import { User, userDataSchema } from '../../../models'

export type AcceptInvitationResponse = Response

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitationHandler = (
	ctx: HandlerContext
): RequestHandler<AcceptInvitationParams, AcceptInvitationResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)
		const parseResult = userDataSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			const deleteResult = await ctx.db.invitations.findOneAndDelete({ _id })
			if (!deleteResult.ok) throw deleteResult.lastErrorObject

			const invitation = deleteResult.value
			if (!invitation) return res.status(404).send({ error: ERRORS.NOT_FOUND })

			const user: User = new Resource({
				_id: invitation._id,
				data: { ...data, ...invitation.data, password: hashSync(data.password, 6) },
				meta: { roleId: invitation.data.roleId },
			})

			const insertResult = await ctx.db.users.insertOne(user.toBson())
			if (!insertResult.acknowledged) throw ERRORS.UNKNOWN

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
