import { z } from 'zod'

export interface SuccessResponse<T> {
	data: T
}

export const successResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.object({ data: schema })

export type Error = {}
type ErrorSchema = z.ZodLazy<
	z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, ErrorSchema]>>
>
export const errorSchema: ErrorSchema = z.lazy(() =>
	z.record(z.union([z.string(), errorSchema]))
)

export const errorResponseSchema = z.object({
	error: errorSchema,
})

export type ErrorResponse = z.TypeOf<typeof errorResponseSchema>

export type Response<T> = SuccessResponse<T> | ErrorResponse

export const responseSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.union([successResponseSchema(schema), errorResponseSchema])
