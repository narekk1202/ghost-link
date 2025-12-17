import {
	bufferToBase64,
	encryptData,
	exportKeyToBase64,
	generateSymmetricKey,
	importKeyFromBase64,
	base64ToBuffer,
	decryptData,
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
		const res = await client.notes[':id'].$get({ param: { id } });

		if (!res.ok) {
			throw new Error('Note not found');
		}

		const note = await res.json();
		return note;
	}

	async decryptNote(encryptedContent: string, base64Key: string) {
		const [ivString, cipherString] = encryptedContent.split('.');

		const key = await importKeyFromBase64(base64Key);
		const iv = base64ToBuffer(ivString);
		const cipherText = base64ToBuffer(cipherString);

		return await decryptData(key, cipherText, iv);
	}
}

export const notesService = new NotesService();
