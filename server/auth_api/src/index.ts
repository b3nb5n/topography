import { json } from 'body-parser'
import express from 'express'
import connectDB from './db'
import router from './routes'

const main = async () => {
	try {
		const db = await connectDB()
		const app = express()
		app.use(json())
		app.use('/', router({ db }))

		const PORT = process.env.PORT ?? 5500
		app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`))
	} catch (error) {
		console.error(error)
	}
}

main()

export * from './routes'
