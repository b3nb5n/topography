import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const deleteInvitation = async (ctx: Context, id: string) => {
	await ctx.prisma.invitation.delete({ where: { id } })
}

export type DeleteInvitationResponse = Response<
	Awaited<ReturnType<typeof deleteInvitation>>
>

interface DeleteInvitationParams {
	id: string
}

export const deleteInvitationHandler = (
	ctx: Context
): RequestHandler<DeleteInvitationParams, DeleteInvitationResponse> => {
	return async (req, res) => {
		const { id } = req.params

		// TODO: Authenticate request

		try {
			return res.send({ data: await deleteInvitation(ctx, id) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
