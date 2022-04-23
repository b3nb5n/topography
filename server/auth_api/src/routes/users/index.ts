import { Router } from 'express'
import { Context } from '../..'
import authenticate from '../../middleware/authenticate'
import { getUsersHandler } from './get'
import { deleteUserHandler } from './user/delete'
import { getUserHandler } from './user/get'
import { patchUserHandler } from './user/patch'

const usersRouter = (ctx: Context) => {
	const router = Router()

	router.use('/', authenticate)

	router.get('/', getUsersHandler(ctx))
	router.get('/:id', getUserHandler(ctx))
	router.patch('/:id', patchUserHandler(ctx))
	router.delete('/:id', deleteUserHandler(ctx))

	return router
}

export default usersRouter
