import { Router } from 'express'
import { Context } from '../..'
import getProperties from './get'
import postProperty from './post'
import deleteProperty from './property/delete'
import getProperty from './property/get'
import patchProperty from './property/patch'

const propertiesRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getProperties(ctx))
	router.post('/', postProperty(ctx))
	router.get('/:id', getProperty(ctx))
	router.patch('/:id', patchProperty(ctx))
	router.delete('/:id', deleteProperty(ctx))

	return router
}

export default propertiesRouter
