import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import { invitationSchema } from '../../generated/models'
import { Invitation } from '../../generated/prisma'

export const createInvitation = async (ctx: Context, data: Invitation) => {
	await ctx.prisma.invitation.create({
		data: {
			id: uid(16),
			email: data.email,
			role: { connect: { id: data.roleId } },
		},
	})
}

export type PostInvitationResponse = Response<
	Awaited<ReturnType<typeof createInvitation>>
>

export const postInvitationHandler = (
	ctx: Context
): RequestHandler<{}, PostInvitationResponse> => {
	return async (req, res) => {
		const parseResult = invitationSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			return res.status(201).send({ data: await createInvitation(ctx, data) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
