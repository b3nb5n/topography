import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { invitationRepository, userRepository } from '../../../data-source'
import { invitationSchema, User, userDataSchema } from '../../../entities'

export type AcceptInvitationResponse = Response

interface AcceptInvitationParams {
	id: string
}

export const acceptInvitationHandler: RequestHandler<
	AcceptInvitationParams,
	AcceptInvitationResponse
> = async (req, res) => {
	const { id } = req.params
	const parseResult = userDataSchema.omit({ roleId: true }).safeParse(req.body)
	if (!parseResult.success)
		return res.status(400).send({ error: parseResult.error })
	const { data } = parseResult

	try {
		const deleteResult = await invitationRepository.findOneAndDelete({ id })
		if (!deleteResult.ok) throw deleteResult.lastErrorObject
		const invitation = invitationSchema.parse(deleteResult.value)
		const user = new User({
			id: invitation.id,
			data: { ...data, ...invitation.data },
		})
		await userRepository.save(user)

		return res.send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}
