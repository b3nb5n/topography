import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { userRepository } from '../../../data-source'

export type DeleteUserResponse = Response

interface DeleteUserParams {
	id: string
}

export const deleteUserHandler: RequestHandler<
	DeleteUserParams,
	DeleteUserResponse
> = async (req, res) => {
	let { id } = req.params
	// local variable `payload` set by `authenticate` middleware.
	if (id === 'me') id = res.locals.payload.uid

	try {
		await userRepository.deleteOne({ id })
		return res.send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}
