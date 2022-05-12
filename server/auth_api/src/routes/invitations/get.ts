import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { invitationRepository } from '../../data-source'
import { Invitation } from '../../entities'

type GetInvitationsResponse = Response<Invitation[]>

export const getInvitationsHandler: RequestHandler<
	{},
	GetInvitationsResponse
> = async (_req, res) => {
	try {
		const invitations = await invitationRepository.find()
		return res.send({ data: invitations })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
