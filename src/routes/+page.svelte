<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import type { Puzzle } from '$lib/firebase';
  import { goto } from '$app/navigation';

  export let data: { puzzle: Puzzle | null };

  type Tile = { word: string; group: number; locked: boolean };

  const tiles = writable<Tile[]>([]);
  const selected = writable<Set<string>>(new Set());
  const solvedOrder = writable<number[]>([]);

  // Distinct colors for solved groups (change to 'bg-gray-600' if you prefer gray-out)
  const COLOR_CLASSES = ['bg-yellow-600','bg-green-600','bg-blue-600','bg-purple-600'];

  const shuffle = <T,>(arr: T[]) =>
    arr.map(v => ({ v, r: Math.random() })).sort((a,b)=>a.r-b.r).map(({ v }) => v);

  function colorFor(groupIdx: number) {
    const order = get(solvedOrder);
    const pos = order.indexOf(groupIdx);
    return pos >= 0 ? COLOR_CLASSES[pos] : '';
  }

  onMount(() => {
    if (!data.puzzle) return;
    const all: Tile[] = data.puzzle.groups.flatMap((g, gi) =>
      g.answers.map(w => ({ word: w, group: gi, locked: false }))
    );
    tiles.set(shuffle(all));
  });

  function toggle(word: string) {
    const t = get(tiles).find(t => t.word === word);
    if (t?.locked) return;
    selected.update(s => {
      if (s.has(word)) s.delete(word);
      else if (s.size < 4) s.add(word);
      return new Set(s);
    });
  }

  function clear() { selected.set(new Set()); }

  function reshuffleRemainder() {
    const cur = get(tiles);
    const locked = cur.filter(t => t.locked);
    const rest = shuffle(cur.filter(t => !t.locked));
    tiles.set([...locked, ...rest]);
  }

  function submit() {
    const sel = Array.from(get(selected));
    if (sel.length !== 4) return alert('Please select exactly 4 words.');

    const cur = get(tiles);
    const chosen = cur.filter(t => sel.includes(t.word));
    const g = chosen[0]?.group;

    const isFourSameGroup = chosen.length === 4 && chosen.every(t => t.group === g);
    const alreadySolved = get(solvedOrder).includes(g ?? -1);

    if (isFourSameGroup && !alreadySolved && data.puzzle) {
      tiles.update(arr => arr.map(t => (t.group === g ? { ...t, locked: true } : t)));
      solvedOrder.update(o => [...o, g!]);
      alert(`✅ ${data.puzzle.groups[g!].description}`);
      clear();
      reshuffleRemainder();
    } else {
      alert('❌ Try again.');
    }
  }
</script>

{#if data.puzzle}
<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
  <div class="mx-auto max-w-4xl space-y-8">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        {data.puzzle.title} — by {data.puzzle.author}
      </h1>
      <div class="flex justify-center sm:justify-end space-x-2">
        <button class="w-full sm:w-auto rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500" on:click={() => goto('/puzzles')}>All Puzzles</button>
        <a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a>
        <button class="w-full sm:w-auto rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500" on:click={() => goto('/create')}>Create</button>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
      {#each $tiles as t}
        <button
          class={`aspect-square flex items-center justify-center rounded-lg transition-colors duration-200
                  ${t.locked
                    ? `${colorFor(t.group)} text-white`
                    : ($selected.has(t.word)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700')}`}
          disabled={t.locked}
          on:click={() => toggle(t.word)}
        >
          {t.word}
        </button>
      {/each}
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button class="w-full sm:w-auto rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500" on:click={reshuffleRemainder}>Shuffle</button>
      <button class="w-full sm:w-auto rounded bg-yellow-500 px-6 py-2 text-gray-900 hover:bg-yellow-400" on:click={clear}>Clear</button>
      <button class="w-full sm:w-auto rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500" on:click={submit}>Submit</button>
    </div>

    <div class="text-center pt-4">
      <a href="/create" class="inline-block rounded bg-indigo-600 px-6 py-2 text-white shadow hover:bg-indigo-500">Create a Puzzle</a>
    </div>
  </div>
</main>
{:else}
<main class="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 p-4">
  <div class="text-center space-y-4">
    <p>No puzzle loaded.</p>
    <a href="/create" class="inline-block rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-500">Create one →</a>
  </div>
</main>
{/if}
