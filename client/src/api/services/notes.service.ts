import {
	bufferToBase64,
	encryptData,
	exportKeyToBase64,
	generateSymmetricKey,
} from '@/utils/crypto';
import { client } from '../hono-client';

class NotesService {
	async createNote(plainText: string, ttl?: number) {
		const key = await generateSymmetricKey();
		const { cipherText, iv } = await encryptData(key, plainText);
		const encryptedContent = `${bufferToBase64(iv)}.${bufferToBase64(cipherText)}`;

		const res = await client.create.$post({
			json: { encryptedContent: encryptedContent, ttl },
		});

		const data = await res.json();
		const base64Key = await exportKeyToBase64(key);

		return {
			...data,
			key: base64Key,
		};
	}

	async getNote(id: string) {
		const note = await client.notes[':id'].$get({ param: { id } });
		return note;
	}
}

export const notesService = new NotesService();
