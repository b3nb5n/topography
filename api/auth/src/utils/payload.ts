import { z } from 'zod'

export const payloadShema = z.object({
	uid: z.string(),
})

export type Payload = z.TypeOf<typeof payloadShema>
