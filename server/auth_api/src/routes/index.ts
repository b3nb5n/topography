import { Router } from 'express'
import { DB } from '../db'
import invitationsRouter from './invitations'
import rolesRouter from './roles'
import tokenRouter from './token'
import usersRouter from './users'

export interface HandlerContext {
	db: DB
}

const router = (ctx: HandlerContext) => {
	const router = Router()

	router.use('/invitations', invitationsRouter(ctx))
	router.use('/users', usersRouter(ctx))
	router.use('/roles', rolesRouter(ctx))
	router.use('/token', tokenRouter(ctx))

	return router
}

export default router
