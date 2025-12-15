export type Env = {
	PORT: number;
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
};

export const env: Env = {
	PORT: Number(process.env.PORT ?? 3000),
	UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? '',
	UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
};

if (!Number.isFinite(env.PORT) || env.PORT <= 0) {
	throw new Error(`Invalid PORT: ${process.env.PORT}`);
}

if (!env.UPSTASH_REDIS_REST_URL) {
	throw new Error('UPSTASH_REDIS_REST_URL is not set');
}

if (!env.UPSTASH_REDIS_REST_TOKEN) {
	throw new Error('UPSTASH_REDIS_REST_TOKEN is not set');
}
