import { z } from 'zod'

export interface SuccessResponse<T> {
	data: T
}

export const successResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.object({ data: schema })

export const errorResponseSchema = z.object({
	error: z.any(),
})

export type ErrorResponse = z.TypeOf<typeof errorResponseSchema>

export type Response<T> = SuccessResponse<T> | ErrorResponse

export const responseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.union([successResponseSchema(schema), errorResponseSchema])
