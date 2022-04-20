import { idSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../prisma'

const getCollections = async (req: Request, res: Response) => {
	const { propertyId } = req.params
	if (idSchema.safeParse(propertyId).success) return res.sendStatus(400)

	const collections = await db.collection.findMany({ where: { propertyId } })
	return res.status(200).send({ data: collections })
}

export default getCollections
