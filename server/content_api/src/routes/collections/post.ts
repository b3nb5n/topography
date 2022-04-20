import {
	collectionSchema,
	dataSchema,
	idSchema,
	newCollection,
	newMeta,
} from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../prisma'

const postCollection = async (req: Request, res: Response) => {
	const { propertyId } = req.params
	if (!idSchema.safeParse(propertyId).success) return res.sendStatus(400)

	const parseResult = await dataSchema(collectionSchema).safeParseAsync(req.body)
	if (!parseResult.success) return res.sendStatus(400)
	if (parseResult.data.propertyId !== propertyId) return res.sendStatus(400)

	// TODO: authenticate request sender

	const collection = newCollection(parseResult.data)
	const meta = newMeta({ id: collection.metaId, type: 'Collection' })

	await db.collection.create({
		data: {
			id: collection.id,
			meta: { create: meta },
			property: { connect: { id: collection.propertyId } },
			schema: collection.schema ?? {},
		},
	})

	return res.status(201).send({
		resource: { id: collection.id },
	})
}

export default postCollection
