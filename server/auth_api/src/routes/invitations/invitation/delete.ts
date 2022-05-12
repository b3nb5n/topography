import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { invitationRepository } from '../../../data-source'

export type DeleteInvitationResponse = Response

interface DeleteInvitationParams {
	id: string
}

export const deleteInvitationHandler: RequestHandler<
	DeleteInvitationParams,
	DeleteInvitationResponse
> = async (req, res) => {
	const { id } = req.params

	try {
		const result = await invitationRepository.deleteOne({ id })
		if (!result.deletedCount)
			return res.status(404).send({ error: ERRORS.NOT_FOUND })
		if (!result.result.ok) throw ERRORS.UNKNOWN

		return res.send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}
