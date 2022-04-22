import { Router } from 'express'
import { Context } from '../..'
import getUsers from './get'
import getUser from './user/get'
import patchUser from './user/patch'

const usersRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getUsers(ctx))
	router.get('/:id', getUser(ctx))
	router.patch('/:id', patchUser(ctx))

	return router
}

export default usersRouter
