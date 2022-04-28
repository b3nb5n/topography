import { PrismaClient } from '@prisma/client'
import { json } from 'body-parser'
import express from 'express'
import router from './routes'

export interface Context {
	prisma: PrismaClient
	jwtSecret: string
}

;;;;;;(async () => {
	const globalContext: Context = {
		prisma: new PrismaClient(),
		jwtSecret: process.env.SECRET ?? '',
	}

	await globalContext.prisma.$connect()

	const app = express()
	app.use(json())

	app.use('/', router(globalContext))
	// jjj

	const PORT = process.env.PORT ?? 5500
	app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`))
})()

export * from './routes'

