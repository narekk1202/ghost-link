import { client } from '../hono-client';

export class NotesService {
	async createNote(encryptedContent: string, ttl?: number) {
		return await client.create.$post({ json: { encryptedContent, ttl } });
	}

	async getNote(id: string) {
		return await client.notes[':id'].$get({ param: { id } });
	}
}
