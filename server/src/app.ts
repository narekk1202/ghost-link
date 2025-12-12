import { Hono } from 'hono';

import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { registerRoutes } from './routes';

export const app = new Hono();

app.use(corsMiddleware).use(loggerMiddleware);

registerRoutes(app);

export default app;
