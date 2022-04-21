import { PrismaClient } from '@prisma/client'
import express from 'express'
import db from './prisma'
import router from './routes'

export interface Context {
	prisma: PrismaClient
}

const PORT = process.env.PORT ?? 8080
const app = express()

app.use('/', router)

const server = app.listen(PORT, () =>
	console.log(`Content API running on port ${PORT}`)
)

server.on('close', () => db.$disconnect())
