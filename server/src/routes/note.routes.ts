import type { Env, Hono } from 'hono';

import { zValidator } from '@hono/zod-validator';
import { createNoteSchema } from '@server/utils/validations/note.validations';
import { createNote, getNote } from '../handlers/note.handlers';

export const registerNoteRoutes = (app: Hono<Env>) => {
	app.post('/create', zValidator('json', createNoteSchema), createNote);
	app.get('/notes/:id', getNote);
};
