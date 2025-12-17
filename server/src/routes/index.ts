import type { Env, Hono } from 'hono';

import { registerNoteRoutes } from './note.routes';

export const registerRoutes = <T extends Hono<Env>>(app: T) =>
	registerNoteRoutes(app);
