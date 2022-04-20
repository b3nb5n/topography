import { dataSchema, newMeta, propertySchema } from '@topography/utils'
import { Request, Response } from 'express'
import { uid } from 'uid'
import db from '../../prisma'

const postProperty = async (req: Request, res: Response) => {
	// TODO: Authenticate request

	const parseResult = dataSchema(propertySchema).safeParse(req.body)
	if (!parseResult.success) return res.send(400)

	const id = uid(16)
	const meta = newMeta({ id, type: 'Property' })

	try {
		await db.property.create({
			data: {
				id,
				meta: { create: meta },
				...parseResult.data,
			},
		})
	} catch (err) {
		return res.sendStatus(500)
	}

	return res.status(201).send({
		resource: { id },
	})
}

export default postProperty
