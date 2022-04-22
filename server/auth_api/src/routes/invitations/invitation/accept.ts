import { errors, Response } from '@topography/comm'
import { UserData, userDataSchema } from '@topography/schema'
import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type AcceptInvitationResponse = Response<UserData>

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitation = (
	ctx: Context
): RequestHandler<AcceptInvitationParams, AcceptInvitationResponse> => {
	return async (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		const parseResult = userDataSchema.omit({ roleId: true }).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			const invitation = await ctx.prisma.invitation.findUnique({ where: { id } })
			if (!invitation) return res.status(404).send({ error: errors.NOT_FOUND })

			const hashedPassword = await hash(data.password, 6)

			ctx.prisma.$transaction([
				ctx.prisma.invitation.delete({ where: { id } }),
				ctx.prisma.user.create({
					data: {
						id,
						...data,
						email: invitation.email,
						password: hashedPassword,
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
