import { Router } from 'express'
import { Context } from '../..'
import { postRoleHandler } from './post'

const rolesRouter = (ctx: Context) => {
	const router = Router()

	router.post('/', postRoleHandler(ctx))

	return router
}

export default rolesRouter
