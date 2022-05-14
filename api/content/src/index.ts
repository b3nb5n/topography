import { json } from 'body-parser'
import express from 'express'
import router from './routes'

const main = async () => {
	const app = express()
	app.use(json({ type: 'application/json' }))
	app.use('/', router)

	const PORT = process.env.PORT ?? 8080
	app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
}

main()

export * from './models'
