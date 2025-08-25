<!-- src/routes/puzzles/[id]/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import type { Puzzle } from '$lib/firebase';
  import { onUserChanged, loadProgress, saveProgress } from '$lib/firebase';

  // Provided by +page.ts
  export let data: { puzzle: Puzzle };

  // Each tile knows its word, group index, and lock state
  type Tile = { word: string; group: number; locked: boolean };

  const tiles = writable<Tile[]>([]);
  const selected = writable<Set<string>>(new Set());
  const solvedOrder = writable<number[]>([]); // order groups were solved in

  // Colors for solved groups (mapped by solve order)
  const COLOR_CLASSES = ['bg-yellow-600','bg-green-600','bg-blue-600','bg-purple-600'];

  const shuffle = <T,>(arr: T[]) =>
    arr.map((v) => ({ v, r: Math.random() }))
       .sort((a, b) => a.r - b.r)
       .map(({ v }) => v);

  function groupColorClass(groupIdx: number) {
    const order = get(solvedOrder);
    const pos = order.indexOf(groupIdx);
    return pos >= 0 ? COLOR_CLASSES[pos] : '';
  }

  function baseTiles(): Tile[] {
    return data.puzzle.groups.flatMap((g, gi) =>
      g.answers.map((w) => ({ word: w, group: gi, locked: false }))
    );
  }

  function normalizeLockedFirst(arr: Tile[]) {
    const locked = arr.filter((t) => t.locked);
    const rest = arr.filter((t) => !t.locked);
    return [...locked, ...rest];
  }

  async function persist() {
    // No-op if not logged in (handled in helper)
    await saveProgress(data.puzzle.id, {
      tileOrder: get(tiles).map((t) => t.word),
      solvedOrder: get(solvedOrder),
      selected: Array.from(get(selected))
    });
  }

  async function tryRestore() {
    const prog = await loadProgress(data.puzzle.id);
    const base = baseTiles();

    if (!prog) {
      tiles.set(shuffle(base));
      return;
    }

    // Rebuild tile order using saved words (fallback to any leftovers)
    const byWord = new Map(base.map((t) => [t.word, t]));
    const ordered: Tile[] = [];
    for (const w of prog.tileOrder ?? []) {
      const t = byWord.get(w);
      if (t) ordered.push({ ...t });
      byWord.delete(w);
    }
    for (const t of byWord.values()) ordered.push({ ...t }); // append new/changed words

    const solvedSet = new Set(prog.solvedOrder ?? []);
    const withLocks = ordered.map((t) => (solvedSet.has(t.group) ? { ...t, locked: true } : t));

    tiles.set(normalizeLockedFirst(withLocks));
    solvedOrder.set(prog.solvedOrder ?? []);
    selected.set(new Set(prog.selected ?? []));
  }

  onMount(() => {
    // Start with a shuffled board immediately
    tiles.set(shuffle(baseTiles()));

    // Restore when user becomes available
    const unsubAuth = onUserChanged(async (u) => {
      if (u) await tryRestore();
    });

    // Also attempt immediate restore (auth may already be ready)
    void tryRestore();

    // Best-effort persist on tab close
    const beforeUnload = () => { void persist(); };
    window.addEventListener('beforeunload', beforeUnload);

    onDestroy(() => {
      window.removeEventListener('beforeunload', beforeUnload);
      void persist();
      unsubAuth?.();
    });
  });

  function toggle(word: string) {
    const t = get(tiles).find((t) => t.word === word);
    if (t?.locked) return; // ignore locked tiles
    selected.update((s) => {
      if (s.has(word)) s.delete(word);
      else if (s.size < 4) s.add(word);
      return new Set(s);
    });
    void persist();
  }

  function clear() {
    selected.set(new Set());
    void persist();
  }

  function reshuffleRemainder() {
    const cur = get(tiles);
    const locked = cur.filter((t) => t.locked);
    const rest = shuffle(cur.filter((t) => !t.locked));
    tiles.set([...locked, ...rest]);
    void persist();
  }

  function submit() {
    const sel = Array.from(get(selected));
    if (sel.length !== 4) {
      alert('Please select exactly 4 words.');
      return;
    }
    const currentTiles = get(tiles);
    const chosen = currentTiles.filter((t) => sel.includes(t.word));
    const g = chosen[0]?.group;

    const isSameGroup = chosen.length === 4 && chosen.every((t) => t.group === g);
    const alreadySolved = get(solvedOrder).includes(g ?? -1);

    if (isSameGroup && !alreadySolved) {
      // Lock the solved group
      tiles.update((all) => all.map((t) => (t.group === g ? { ...t, locked: true } : t)));
      solvedOrder.update((o) => [...o, g!]);
      alert(`✅ ${data.puzzle.groups[g!].description}`);

      // Clear selection and keep solved rows at the top
      selected.set(new Set());
      tiles.update(normalizeLockedFirst);

      void persist();
    } else {
      alert('❌ Try again.');
    }
  }
</script>

<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Header with buttons; stacks on mobile, inline md+ -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h1 class="text-2xl md:text-3xl font-bold text-center">
        {data.puzzle.title} — by {data.puzzle.author}
      </h1>
      <div class="flex justify-center sm:justify-end space-x-2">
        <button
          class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 w-full sm:w-auto"
          on:click={() => goto('/puzzles')}
        >
          All Puzzles
        </button>
        <button
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500 w-full sm:w-auto"
          on:click={() => goto('/create')}
        >
          Create Puzzle
        </button>
      </div>
    </div>

    <!-- Board -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
      {#each $tiles as t}
        <button
          class={`aspect-square flex items-center justify-center rounded-lg transition-colors duration-200
                   ${t.locked
                     ? `${groupColorClass(t.group)} text-white`
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

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        class="w-full sm:w-auto rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
        on:click={reshuffleRemainder}
      >
        Shuffle
      </button>
      <button
        class="w-full sm:w-auto rounded bg-yellow-400 px-6 py-2 text-gray-900 hover:bg-yellow-300"
        on:click={clear}
      >
        Clear
      </button>
      <button
        class="w-full sm:w-auto rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500"
        on:click={submit}
      >
        Submit
      </button>
    </div>
  </div>
</main>
