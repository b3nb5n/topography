import { Response } from 'express'
import { Context, contextSchema } from '../context'

const getContext = (res: Response): Context => {
	const parseResult = contextSchema.safeParse(res.locals.context)
	if (!parseResult.success) throw parseResult.error
	return parseResult.data
}

export default getContext
