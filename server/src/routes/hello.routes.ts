import type { Hono } from 'hono';

import { getHello, getRoot } from '../handlers/hello.handlers';

export const registerHelloRoutes = (app: Hono) => {
	app.get('/', getRoot);
	app.get('/hello', getHello);
};
