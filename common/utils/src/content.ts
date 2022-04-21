import { Collection, Item, Meta, Property } from '@prisma/client'
import { uid } from 'uid'
import { z } from 'zod'

export const idSchema = z.string().regex(/^[a-zA-Z0-9]{16}$/)

export const newMeta = (meta?: Partial<Meta>): Meta => ({
	id: meta?.id ?? uid(16),
	type: meta?.type ?? 'Item',
	created: meta?.created ?? new Date(Date.now()),
	edited: meta?.edited ?? new Date(Date.now()),
	visibility: meta?.visibility ?? 'Live',
})

export const metaSchema = z.object({
	id: idSchema,
	type: z.string(),
	created: z.date(),
	edited: z.date(),
	visibility: z.string(),
})

export type Data<T> = Omit<T, 'id' | 'metaId'>

export const dataSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
	return schema.omit({ id: true, metaId: true })
}

export const newProperty = (property?: Partial<Property>): Property => ({
	id: property?.id ?? uid(16),
	metaId: property?.metaId ?? uid(16),
	host: property?.host ?? null,
})

export const propertySchema = z.object({
	id: idSchema,
	metaId: idSchema,
	host: z.string().nullable(),
})

export const newCollection = (collection?: Partial<Collection>): Collection => ({
	id: collection?.id ?? uid(16),
	metaId: collection?.metaId ?? uid(16),
	propertyId: collection?.propertyId ?? uid(16),
	schema: collection?.schema ?? {},
})

export const collectionSchema = z.object({
	id: idSchema,
	metaId: idSchema,
	propertyId: idSchema,
	schema: z.object({}),
})

export const newItem = (item?: Partial<Item>): Item => ({
	id: item?.id ?? uid(16),
	metaId: item?.id ?? uid(16),
	collectionId: item?.id ?? uid(16),
})

export const itemSchema = z.object({
	id: idSchema,
	metaId: idSchema,
	collectionId: idSchema,
})
