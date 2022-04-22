import { Router } from 'express'
import { Context } from '../..'
import getInvitations from './get'
import acceptInvitation from './invitation/accept'
import deleteInvitation from './invitation/delete'
import postInvitation from './post'

const invitationsRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getInvitations(ctx))
	router.post('/', postInvitation(ctx))
	router.delete('/:id', deleteInvitation(ctx))
	router.post('/:id/accept', acceptInvitation(ctx))

	return router
}

export default invitationsRouter
