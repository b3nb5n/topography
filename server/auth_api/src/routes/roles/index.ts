import { Router } from 'express'
import { Context } from '../..'
import authenticate from '../../middleware/authenticate'
import { getRolesHandler } from './get'
import { postRoleHandler } from './post'
import { deleteRoleHandler } from './role/delete'

const rolesRouter = (ctx: Context) => {
	const router = Router()

	router.use('/', authenticate)

	router.get('/', getRolesHandler(ctx))
	router.post('/', postRoleHandler(ctx))
	router.patch('/:id', postRoleHandler(ctx))
	router.delete('/:id', deleteRoleHandler(ctx))

	return router
}

export * from './get'
export * from './post'
export * from './role/delete'
export * from './role/patch'

export default rolesRouter
