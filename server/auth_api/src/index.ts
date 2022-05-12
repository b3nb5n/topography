import { json } from 'body-parser'
import express from 'express'
import { Db, MongoClient } from 'mongodb'
import 'reflect-metadata'
import router from './routes'

export interface Context {
	db: Db
	jwtSecret: string
}

;(async () => {
	const client = new MongoClient('mongodb://localhost:27017/auth')
	await client.connect()

	const app = express()
	app.use(json())
	app.use('/', router)

	const PORT = process.env.PORT ?? 5500
	app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`))
})()

export * from './routes'
