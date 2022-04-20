import { dataSchema, idSchema, itemSchema } from '@topography/utils'
import { Request, Response } from 'express'
import db from '../../../prisma'

const patchItem = async (req: Request, res: Response) => {
	const idParseResult = idSchema.safeParse(req.params.id)
	if (!idParseResult.success) return res.sendStatus(400)
	const id = idParseResult.data

	const dataParseResult = dataSchema(itemSchema).deepPartial().safeParse(req.body)
	if (!dataParseResult.success) return res.sendStatus(400)
	const { data } = dataParseResult

	// TODO: Authenticate request

	try {
		await db.item.update({ where: { id }, data })
	} catch (err) {
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
}

export default patchItem
