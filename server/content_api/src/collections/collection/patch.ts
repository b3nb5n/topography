import { Request, Response } from 'express'
import { collectionDataSchema } from '../collection'

const patchCollection = async (req: Request, res: Response) => {
	const { property: propertyID, collection: collectionID } = req.params
	if (!propertyID || !collectionID) return res.sendStatus(400)

	const parseResult = await collectionDataSchema.deepPartial().safeParseAsync(req.body)
	if (!parseResult.success) return res.sendStatus(400)

	return res.sendStatus(200)
}

export default patchCollection
