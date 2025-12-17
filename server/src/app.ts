import type { Env } from 'hono'
import { Hono } from 'hono'

import { corsMiddleware } from './middleware/cors'
import { loggerMiddleware } from './middleware/logger'
import { registerRoutes } from './routes'

export const app = registerRoutes(new Hono<Env>());

app.use(corsMiddleware).use(loggerMiddleware);

export default app;
