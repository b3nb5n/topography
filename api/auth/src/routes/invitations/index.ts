import { Router } from 'express'
import { HandlerContext } from '..'
import authenticate from '../../middleware/authenticate'
import unless from '../../middleware/unless'
import { getInvitationsHandler } from './get'
import { acceptInvitationHandler } from './invitation/accept'
import { deleteInvitationHandler } from './invitation/delete'
import { postInvitationHandler } from './post'

const invitationsRouter = (ctx: HandlerContext) => {
	const router = Router()

	router.use(unless(['/:id/accept'], authenticate))

	router.get('/', getInvitationsHandler(ctx))
	router.post('/', postInvitationHandler(ctx))
	router.delete('/:id', deleteInvitationHandler(ctx))
	router.post('/:id/accept', acceptInvitationHandler(ctx))

	return router
}

export * from './get'
export * from './invitation/accept'
export * from './invitation/delete'
export * from './post'

export default invitationsRouter
