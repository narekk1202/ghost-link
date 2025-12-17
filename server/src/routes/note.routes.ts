import type { Env, Hono } from 'hono';

import { zValidator } from '@hono/zod-validator';
import { createNoteSchema } from '@server/utils/validations/note.validations';
import { createNote, getNote } from '../handlers/note.handlers';

export const registerNoteRoutes = <T extends Hono<Env>>(app: T) =>
	app
		.post('/create', zValidator('json', createNoteSchema), createNote)
		.get('/notes/:id', getNote);
