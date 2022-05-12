import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectID } from 'typeorm'
import { invitationRepository } from '../../data-source'
import { Invitation, invitationDataSchema } from '../../entities'

export type PostInvitationResponse = Response<{ id: ObjectID }>

export const postInvitationHandler: RequestHandler<
	{},
	PostInvitationResponse
> = async (req, res) => {
	const parseResult = invitationDataSchema.safeParse(req.body)
	if (!parseResult.success)
		return res.status(400).send({ error: parseResult.error })
	const { data } = parseResult

	try {
		const invitation = new Invitation({ data })
		invitationRepository.save(invitation)
		return res.status(201).send({ data: { id: invitation.id } })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
