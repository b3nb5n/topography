import { Router } from 'express'
import { Context } from '../..'
import getUser from './user/get'
import patchUser from './user/patch'

const invitationsRouter = (ctx: Context) => {
	const router = Router()

	router.get('/:id', getUser(ctx))
	router.patch('/:id', patchUser(ctx))

	return router
}

export default invitationsRouter
