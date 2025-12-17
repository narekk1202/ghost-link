import { create } from 'zustand';

type State = {
	ttl: number;
	content: string;
	setTtl: (ttl: number) => void;
	setContent: (content: string) => void;
};

export const useStatesStore = create<State>(set => ({
	content: '',
	ttl: 86400,
	setTtl: (ttl: number) => set({ ttl }),
	setContent: (content: string) => set({ content }),
}));
