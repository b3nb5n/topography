import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

export interface Context {
	prisma: PrismaClient
}

const router = Router()
export const context: Context = {
	prisma: new PrismaClient(),
}

export default router
