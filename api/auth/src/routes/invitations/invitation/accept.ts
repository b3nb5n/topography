import { Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'
import { invitationSchema, User, userDataSchema } from '../../../models'

export type AcceptInvitationResponse = Response

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitationHandler = (
	ctx: HandlerContext
): RequestHandler<AcceptInvitationParams, AcceptInvitationResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)
		const parseResult = userDataSchema.omit({ roleId: true }).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			const deleteResult = await ctx.db.invitations.findOneAndDelete({ _id })
			if (!deleteResult.ok) throw deleteResult.lastErrorObject
			const invitation = invitationSchema.parse(deleteResult.value)

			const user: User = new Resource({
				_id: invitation._id,
				data: { ...data, ...invitation.data },
			})

			await ctx.db.users.insertOne(user.toBson())

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
