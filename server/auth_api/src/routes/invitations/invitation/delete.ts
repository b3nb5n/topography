import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type DeleteInvitationResponse = Response

interface DeleteInvitationParams {
	id: string
}

const deleteInvitation = (
	ctx: Context
): RequestHandler<DeleteInvitationParams, DeleteInvitationResponse> => {
	return async (req, res) => {
		const { id } = req.params

		// TODO: Authenticate request

		try {
			await ctx.prisma.invitation.delete({ where: { id } })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default deleteInvitation
