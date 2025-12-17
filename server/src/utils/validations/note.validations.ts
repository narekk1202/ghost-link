import { z } from 'zod';

export const createNoteSchema = z.object({
	encryptedContent: z.string(),
	ttl: z.number().min(60).max(86400).optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
