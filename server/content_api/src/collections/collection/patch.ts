import { collectionSchema, dataSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../prisma'

const patchCollection = async (req: Request, res: Response) => {
	const { collectionId } = req.params
	if (!collectionId) return res.sendStatus(400)

	const parseResult = await dataSchema(collectionSchema)
		.deepPartial()
		.safeParseAsync(req.body)
	if (!parseResult.success) return res.sendStatus(400)

	await db.collection.update({
		where: { id: collectionId },
		data: parseResult.data,
	})

	return res.sendStatus(200)
}

export default patchCollection
