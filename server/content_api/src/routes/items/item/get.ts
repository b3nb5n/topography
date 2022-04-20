import { idSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../../prisma'

const getItem = async (req: Request, res: Response) => {
	const parseResult = idSchema.safeParse(req.params.id)
	if (!parseResult.success) return res.sendStatus(400)
	const id = parseResult.data

	try {
		const item = await db.item.findUnique({ where: { id } })
		return res.status(200).send({ resource: item })
	} catch (err) {
		return res.sendStatus(500)
	}
}

export default getItem
