import type { Env } from 'hono';
import { Hono } from 'hono';

import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { registerRoutes } from './routes';

export const app = registerRoutes(
	new Hono<Env>().use(loggerMiddleware).use(corsMiddleware)
);

export default app;
