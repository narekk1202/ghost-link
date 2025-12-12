export type Env = {
	PORT: number;
};

export const env: Env = {
	PORT: Number(process.env.PORT ?? 3000),
};

if (!Number.isFinite(env.PORT) || env.PORT <= 0) {
	throw new Error(`Invalid PORT: ${process.env.PORT}`);
}
