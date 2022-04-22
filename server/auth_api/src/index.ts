import { PrismaClient } from '@prisma/client'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import router from './routes'

export interface Context {
	prisma: PrismaClient
	jwtSecret: string
}

const app = express()
app.use(json())
app.use(cookieParser())

const globalContext: Context = {
	prisma: new PrismaClient(),
	jwtSecret: 'abcdefg',
}

app.use('/', router(globalContext))

const main = async () => {
	await globalContext.prisma.$connect()

	const PORT = process.env.PORT ?? 5500
	app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`))
}

main()
