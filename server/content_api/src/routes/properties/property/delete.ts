import { idSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../../prisma'

const deleteProperty = async (req: Request, res: Response) => {
	const parseResult = idSchema.safeParse(req.params.id)
	if (!parseResult.success) return res.sendStatus(400)
	const id = parseResult.data

	// TODO: Authenticate request

	try {
		await db.property.delete({ where: { id } })
	} catch (err) {
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
}

export default deleteProperty
