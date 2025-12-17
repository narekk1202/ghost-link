import type { Context, Env } from 'hono';

export type ContextWithValidator<T> = Context<Env, any, { out: { json: T } }>;
