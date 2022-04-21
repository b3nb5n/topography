import { Router } from 'express'
import { context } from '..'
import getInvitations from './get'
import acceptInvitation from './invitation/accept'
import postInvitation from './post'

const collectionsRouter = Router()

collectionsRouter.get('/', getInvitations(context))
collectionsRouter.post('/', postInvitation(context))
collectionsRouter.post('/:id', acceptInvitation(context))

export default collectionsRouter
