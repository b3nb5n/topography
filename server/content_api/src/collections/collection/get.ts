import { Request, Response } from 'express'
import db from '../../prisma'

const getCollection = async (req: Request, res: Response) => {
	const { collectionID } = req.params
	if (!collectionID) return res.sendStatus(400)

	const collection = await db.collection.findUnique({
		where: { id: collectionID },
	})

	if (!collection) return res.sendStatus(404)
	return res.send({ data: collection })
}

export default getCollection
