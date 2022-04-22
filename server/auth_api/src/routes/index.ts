import { Router } from 'express'
import { Context } from '..'
import invitationsRouter from './invitations'
import rolesRouter from './roles'
import signin from './signin'
import usersRouter from './users'

const router = (ctx: Context) => {
	const router = Router()

	router.use('/invitations', invitationsRouter(ctx))
	router.use('/users', usersRouter(ctx))
	router.use('/roles', rolesRouter(ctx))

	router.post('/signin', signin(ctx))

	return router
}

export default router
