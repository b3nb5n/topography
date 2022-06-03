import { Router } from 'express'
import { HandlerContext } from '..'
import authenticate from '../../middleware/authenticate'
import meRedirect from '../../middleware/me-redirect'
import { getUsersHandler } from './get'
import { deleteUserHandler } from './user/delete'
import { getUserHandler } from './user/get'
import { patchUserHandler } from './user/patch'

const usersRouter = (ctx: HandlerContext) => {
	const router = Router()

	router.use('/', authenticate)
	router.use('/me', meRedirect)

	router.get('/', getUsersHandler(ctx))
	router.get('/:id', getUserHandler(ctx))
	router.patch('/:id', patchUserHandler(ctx))
	router.delete('/:id', deleteUserHandler(ctx))

	return router
}

export * from './get'
export * from './user/delete'
export * from './user/get'
export * from './user/patch'

export default usersRouter
