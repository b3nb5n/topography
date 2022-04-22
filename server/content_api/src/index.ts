import { PrismaClient } from '@prisma/client'
import { json } from 'body-parser'
import express from 'express'
import router from './routes'

export interface Context {
	prisma: PrismaClient
}

const app = express()
app.use(json({ type: 'application/json' }))

const globalCtx: Context = { prisma: new PrismaClient() }
app.use('/', router(globalCtx))

const main = async () => {
	await globalCtx.prisma.$connect()

	const PORT = process.env.PORT ?? 8080
	app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
}

main()
