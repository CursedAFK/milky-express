import { z } from 'zod'

export default z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(1),
	address: z.string().min(1),
	country: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
	additionalInformation: z.string().optional(),
	coupon: z.string().optional()
})
