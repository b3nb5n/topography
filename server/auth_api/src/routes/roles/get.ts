import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { roleRepository } from '../../data-source'
import { Role } from '../../entities'

export type GetRolesResponse = Response<Role[]>

export const getRolesHandler: RequestHandler<{}, GetRolesResponse> = async (
	_req,
	res
) => {
	try {
		const roles = await roleRepository.find()
		return res.send({ data: roles })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
