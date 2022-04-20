import { Request, Response } from 'express'
import db from '../../prisma'

const getItems = async (_req: Request, res: Response) => {
	try {
		const items = await db.item.findMany()
		return res.status(200).send({ resources: items })
	} catch (err) {
		return res.sendStatus(500)
	}
}

export default getItems
