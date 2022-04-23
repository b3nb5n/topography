import { Router } from 'express'
import { Context } from '../..'
import { getUsersHandler } from './get'
import { deleteUserHandler } from './user/delete'
import { patchUserHandler } from './user/patch'

const usersRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getUsersHandler(ctx))
	router.get('/:id', getUsersHandler(ctx))
	router.patch('/:id', patchUserHandler(ctx))
	router.delete('/:id', deleteUserHandler(ctx))

	return router
}

export default usersRouter
