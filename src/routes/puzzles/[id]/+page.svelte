<!-- src/routes/puzzles/[id]/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import type { Puzzle } from '$lib/firebase';

  // Provided by +page.ts
  export let data: { puzzle: Puzzle };

  // Game state
  const board = writable<string[]>([]);
  const selected = writable<Set<string>>(new Set());

  // Shuffle helper
  const shuffle = (arr: string[]) =>
    arr
      .map((v) => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);

  onMount(() => {
    const all = data.puzzle.groups.flatMap((g) => g.answers);
    board.set(shuffle(all));
  });

  function toggle(word: string) {
    selected.update((s) => {
      if (s.has(word)) s.delete(word);
      else if (s.size < 4) s.add(word);
      return new Set(s);
    });
  }

  function clear() {
    selected.set(new Set());
  }

  function reshuffle() {
    board.update((b) => shuffle(b));
    clear();
  }

  function submit() {
    const sel = Array.from(get(selected));
    if (sel.length !== 4) {
      alert('Please select exactly 4 words.');
      return;
    }
    const group = data.puzzle.groups.find((g) =>
      sel.every((w) => g.answers.includes(w))
    );
    alert(group ? `✅ ${group.description}` : '❌ Try again.');
    clear();
    reshuffle();
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

    <!-- Responsive grid: 2 cols on mobile, 3 on sm, 4 on md+ -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
      {#each $board as word}
        <button
          class="aspect-square flex items-center justify-center rounded-lg transition-colors duration-200
                 { $selected.has(word)
                   ? 'bg-blue-600 text-white'
                   : 'bg-gray-800 hover:bg-gray-700'}"
          on:click={() => toggle(word)}
        >
          {word}
        </button>
      {/each}
    </div>

    <!-- Controls: stacked vertically on mobile, inline on sm+ -->
    <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        class="w-full sm:w-auto rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
        on:click={reshuffle}
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
