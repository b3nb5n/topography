import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { roleRepository } from '../../../data-source'

export type DeleteRoleResponse = Response

interface DeleteRoleParams {
	id: string
}

export const deleteRoleHandler: RequestHandler<
	DeleteRoleParams,
	DeleteRoleResponse
> = async (req, res) => {
	const { id } = req.params

	try {
		await roleRepository.deleteOne({ id })
		return res.send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}
