import { z } from 'zod'

export enum Access {
	None, // cannot access the resource
	View, // can view the resource
	Edit, // can update and delete the resource
	Admin, // can edit other users access to to the resource
}

export const accessSchema = z.nativeEnum(Access)
