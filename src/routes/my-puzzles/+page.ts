// src/routes/my-puzzles/+page.ts
import { fetchMyPuzzles } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { user } from '$lib/stores/user';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // if no one’s signed in, go to /login
  if (!get(user)) {
    throw redirect(302, '/login');
  }

  // fetch only this user’s puzzles
  const puzzles = await fetchMyPuzzles();
  return { puzzles };
};
