import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectID } from 'typeorm'
import { roleRepository } from '../../data-source'
import { Role, RoleData, roleDataSchema } from '../../entities'

export type PostRoleResponse = Response<{ id: ObjectID }>

export const postRoleHandler: RequestHandler<{}, PostRoleResponse> = async (
	req,
	res
) => {
	const parseResult = roleDataSchema.safeParse(req.body)
	if (!parseResult.success)
		return res.status(400).send({ error: parseResult.error })
	const { data } = parseResult

	try {
		const role = new Role({ data: new RoleData(data) })
		await roleRepository.save(role)
		return res.status(201).send({ data: { id: role.id } })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
