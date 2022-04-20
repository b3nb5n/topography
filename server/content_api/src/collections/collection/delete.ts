import { Request, Response } from 'express'
import db from '../../prisma'

const deleteCollection = async (req: Request, res: Response) => {
	const { collectionID } = req.params
	if (!collectionID) return res.sendStatus(400)
	await db.collection.delete({ where: { id: collectionID } })
	return res.sendStatus(200)
}

export default deleteCollection
