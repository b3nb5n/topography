import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type AcceptInvitationResponseData = undefined

export type AcceptInvitationResponse = Response<AcceptInvitationResponseData>

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitation = (
	ctx: Context
): RequestHandler<AcceptInvitationParams, AcceptInvitationResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({})

		try {
			const invitation = await ctx.prisma.invitation.findUnique({ where: { id } })
			if (!invitation) return res.sendStatus(404)

			const [_, user] = await ctx.prisma.$transaction([
				ctx.prisma.invitation.delete({ where: { id } }),
				ctx.prisma.user.create({
					data: {
						id,
						email: invitation.email,
						firstName: '',
						lastName: '',
						password: '',
						role: { connect: { id: invitation.roleId } },
					},
				}),
			])

			return res.sendStatus(200)
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default acceptInvitation
