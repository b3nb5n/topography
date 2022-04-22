import { Router } from 'express'
import { Context } from '..'
import invitationsRouter from './invitations'
import signin from './signin'

const router = (ctx: Context) => {
	const router = Router()

	router.use('/invitations', invitationsRouter(ctx))
	router.post('/signin', signin(ctx))

	return router
}

export default router
