import type { Context } from 'hono';
import type { ApiResponse } from 'shared/dist';

export const getRoot = (c: Context) => {
	return c.text('Hello Hono!');
};

export const getHello = (c: Context) => {
	const data: ApiResponse = {
		message: 'Hello BHVR!',
		success: true,
	};

	return c.json(data, { status: 200 });
};
