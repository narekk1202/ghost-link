import type { Hono } from 'hono';

import { registerHelloRoutes } from './hello.routes';

export const registerRoutes = (app: Hono) => {
	registerHelloRoutes(app);
};
