// @ts-nocheck
// src/routes/+page.ts
import type { PageLoad } from './$types';
import { fetchPuzzles } from '$lib/firebase';

export const load = async () => {
	const puzzles = await fetchPuzzles();
	// choose the first (or apply logic for selecting)
	// return {
	// 	puzzle: puzzles[0] ?? null
	// };

	const puzzle = puzzles.length ? puzzles[Math.floor(Math.random() * puzzles.length)] : null

	return {puzzle}

};


console.log("hello");null as any as PageLoad;