import { redis } from '@server/libs/redis';
import type { ContextWithValidator } from '@server/types/main.types';
import type { CreateNoteInput } from '@server/utils/validations/note.validations';
import type { Context } from 'hono';

export const createNote = async (c: ContextWithValidator<CreateNoteInput>) => {
	const { encryptedContent, ttl } = c.req.valid('json');
	const id = crypto.randomUUID();
	const expiry = Date.now() + (ttl || 86400) * 1000;

	try {
		const pipeline = redis.pipeline();

		pipeline.hset(`note:${id}`, {
			encryptedContent,
			expiry: expiry.toString(),
		});
		pipeline.expire(`note:${id}`, ttl || 86400);
		await pipeline.exec();

		return c.json({ id });
	} catch (error) {
		console.error('Redis error:', error);
		return c.json({ message: 'Failed to create note.' }, 500);
	}
};

export const getNote = async (c: Context) => {
	c.header('Cache-Control', 'no-store, max-age=0')
	const { id } = c.req.param();
	const note = await redis.hgetall(`note:${id}`);

	if (!note || !note.encryptedContent) {
		return c.json({ message: 'Note not found.' }, 404);
	}

	const expiry = Number(note.expiry || 0);
	if (Date.now() > expiry) {
		await redis.del(`note:${id}`);
		return c.json({ message: 'Note expired.' }, 404);
	}

	await redis.del(`note:${id}`);

	return c.json({ encryptedContent: note.encryptedContent });
};
