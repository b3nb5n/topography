import { Router } from 'express'
import { Context } from '../..'
import { getTokenHandler } from './get'

const tokenRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getTokenHandler(ctx))

	return router
}

export default tokenRouter
