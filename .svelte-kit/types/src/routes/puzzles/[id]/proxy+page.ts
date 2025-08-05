// @ts-nocheck
// src/routes/puzzles/[id]/+page.ts
import type { PageLoad } from './$types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
	const snapshot = await getDoc(doc(db, 'puzzles', params.id));
	if (!snapshot.exists()) {
		throw error(404, 'Puzzle not found');
	}
	const data = snapshot.data();
	return {
		puzzle: {
			id: snapshot.id,
			title: data.title,
			author: data.author,
			groups: data.groups
		}
	};
};
