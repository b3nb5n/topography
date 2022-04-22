import { Router } from 'express'
import { Context } from '../..'
import { postRole } from './post'

const rolesRouter = (ctx: Context) => {
	const router = Router()

	router.post('/', postRole(ctx))

	return router
}

export default rolesRouter
