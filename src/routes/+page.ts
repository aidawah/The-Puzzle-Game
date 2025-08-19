// src/routes/+page.ts
import type { PageLoad } from './$types';
import { fetchPuzzles } from '$lib/firebase';

export const load: PageLoad = async () => {
	const puzzles = await fetchPuzzles();
	// choose the first (or apply logic for selecting)
	// return {
	// 	puzzle: puzzles[0] ?? null
	// };

	const puzzle = puzzles.length ? puzzles[Math.floor(Math.random() * puzzles.length)] : null

	console.log('puzzle obj', puzzle)

	return {puzzle}

};
