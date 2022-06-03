import { RequestHandler } from 'express'

const unless = (
	whitelist: string[],
	middleware: RequestHandler
): RequestHandler => {
	return (req, res, next) => {
		const whitelisted = whitelist.some((path) => req.path === path)
		whitelisted ? next() : middleware(req, res, next)
	}
}

export default unless
