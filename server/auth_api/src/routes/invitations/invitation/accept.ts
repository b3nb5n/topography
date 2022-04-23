import { errors, Response } from '@topography/comm'
import { UserData, userDataSchema } from '@topography/schema'
import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const acceptInvitation = async (
	ctx: Context,
	id: string,
	data: UserData
) => {
	const hashedPassword = await hash(data.password, 6)

	await ctx.prisma.$transaction([
		ctx.prisma.invitation.delete({ where: { id } }),
		ctx.prisma.user.create({
			data: {
				id,
				...data,
				roleId: undefined,
				password: hashedPassword,
				role: { connect: { id: data.roleId } },
			},
		}),
	])
}

export type AcceptInvitationResponse = Response<
	Awaited<ReturnType<typeof acceptInvitation>>
>

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitationHandler = (
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

			return res.send({
				data: await acceptInvitation(ctx, id, {
					...data,
					email: invitation.email,
					roleId: invitation.roleId,
				}),
			})
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}
