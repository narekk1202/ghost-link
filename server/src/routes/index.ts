import type { Hono } from 'hono';

import { registerNoteRoutes } from './note.routes';

export const registerRoutes = (app: Hono) => {
	registerNoteRoutes(app);
};
