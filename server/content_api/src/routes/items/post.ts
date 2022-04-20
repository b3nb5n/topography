import { dataSchema, itemSchema, newMeta } from '@topography/utils'
import { Request, Response } from 'express'
import { uid } from 'uid'
import db from '../../prisma'

const postItem = async (req: Request, res: Response) => {
	const parseResult = await dataSchema(itemSchema).safeParseAsync(req.body)
	if (!parseResult.success) return res.sendStatus(400)
	const { data } = parseResult

	// TODO: Authenticate request

	const id = uid(16)
	const meta = newMeta({ id, type: 'Item' })

	try {
		await db.item.create({
			data: {
				id,
				meta: { create: meta },
				collection: { connect: { id: data.collectionId } },
			},
		})
	} catch (err) {
		return res.sendStatus(500)
	}

	return res.status(201).send({ resource: { id } })
}

export default postItem
