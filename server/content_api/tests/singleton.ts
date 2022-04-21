import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import db from './client'

jest.mock('./client', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockReset(prismaMock)
})

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>
