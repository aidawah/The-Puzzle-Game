// @ts-nocheck
// src/routes/+page.ts
import type { PageLoad } from './$types';
import { fetchPuzzles } from '$lib/firebase';

export const load = async () => {
	const puzzles = await fetchPuzzles();
	// choose the first (or apply logic for selecting)
	return {
		puzzle: puzzles[0] ?? null
	};
};
;null as any as PageLoad;