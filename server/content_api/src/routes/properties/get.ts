import { Request, Response } from 'express'
import db from '../../prisma'

const getProperties = async (_req: Request, res: Response) => {
	// TODO: Authenticate request

	try {
		const properties = await db.property.findMany()
		return res.status(200).send({ resources: properties })
	} catch (err) {
		return res.sendStatus(500)
	}
}

export default getProperties
