import { idSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../../prisma'

const getProperty = async (req: Request, res: Response) => {
	const parseResult = idSchema.safeParse(req.params.id)
	if (!parseResult.success) return res.sendStatus(400)
	const id = parseResult.data

	try {
		const property = await db.property.findUnique({ where: { id } })
		return res.status(200).send({ resource: property })
	} catch (err) {
		return res.sendStatus(500)
	}
}

export default getProperty
