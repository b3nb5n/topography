import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockReset } from 'jest-mock-extended'
import { Context } from '../src/routes'

export const prismaMock =
	new PrismaClient() as unknown as DeepMockProxy<PrismaClient>

beforeEach(() => mockReset(prismaMock))

const context: Context = { prisma: prismaMock }
export default context
