// src/routes/puzzles/+page.ts
import type { PageLoad } from './$types';
import { fetchPuzzles } from '$lib/firebase';

export const load: PageLoad = async () => {
	const puzzles = await fetchPuzzles();
	return { puzzles };
};
