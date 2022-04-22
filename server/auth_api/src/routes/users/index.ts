import { Router } from 'express'
import { Context } from '../..'
import patchUser from './user/patch'

const invitationsRouter = (ctx: Context) => {
	const router = Router()

	router.patch('/:id', patchUser(ctx))

	return router
}

export default invitationsRouter
