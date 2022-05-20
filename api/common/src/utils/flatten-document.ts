import { Document } from 'mongodb'

export const flattenDocument = (value: Document) => {
	const result: Document = {}

	for (const i in value) {
		if (typeof value[i] === 'object' && !Array.isArray(value[i])) {
			const nested = flattenDocument(value[i])
			for (const j in nested) {
				result[i + '.' + j] = nested[j]
			}
		} else {
			result[i] = value[i]
		}
	}

	return result
}
