import { Router } from 'express'
import { HandlerContext } from '..'
import { getTokenHandler } from './get'

const tokenRouter = (ctx: HandlerContext) => {
	const router = Router()

	router.get('/', getTokenHandler(ctx))

	return router
}

export * from './get'

export default tokenRouter
