import { Meta } from '@prisma/client'
import { uid } from 'uid'

const newMeta = (data: Partial<Meta>): Meta => {
	const defaultMeta: Meta = {
		id: uid(16),
		type: 'Item',
		created: new Date(Date.now()),
		edited: new Date(Date.now()),
		visibility: 'Live',
	}

	return { ...defaultMeta, ...data }
}

export default newMeta
