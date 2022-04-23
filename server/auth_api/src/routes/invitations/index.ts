import { application, Router } from 'express'
import { Context } from '../..'
import authenticate from '../../middleware/authenticate'
import unless from '../../middleware/unless'
import { getInvitationsHandler } from './get'
import { acceptInvitationHandler } from './invitation/accept'
import { deleteInvitationHandler } from './invitation/delete'
import { postInvitationHandler } from './post'

const invitationsRouter = (ctx: Context) => {
	const router = Router()

	application.use(unless(['/:id/accept'], authenticate))

	router.get('/', getInvitationsHandler(ctx))
	router.post('/', postInvitationHandler(ctx))
	router.delete('/:id', deleteInvitationHandler(ctx))
	router.post('/:id/accept', acceptInvitationHandler(ctx))

	return router
}

export default invitationsRouter
