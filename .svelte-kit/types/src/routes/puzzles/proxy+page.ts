// @ts-nocheck
// src/routes/puzzles/+page.ts
import type { PageLoad } from './$types';
import { fetchPuzzles } from '$lib/firebase';

export const load = async () => {
	const puzzles = await fetchPuzzles();
	return { puzzles };
};
;null as any as PageLoad;