<script lang="ts">
  import { goto } from '$app/navigation';
  import { createPuzzle, type Puzzle } from '$lib/firebase';
  import { user } from '$lib/stores/user';
  import { get } from 'svelte/store';

  if (!get(user)) goto('/login');

  let title = '';
  let author = '';
  let groups: { answersCsv: string; description: string }[] = Array.from(
    { length: 4 },
    () => ({ answersCsv: '', description: '' })
  );

  let positions: Record<string, number> = {};

  $: {
    const entries: { key: string; word: string }[] = [];
    groups.forEach((g, gi) => {
      g.answersCsv
        .split(',')
        .map((w) => w.trim())
        .forEach((w, ai) => {
          if (w) entries.push({ key: `${gi}-${ai}`, word: w });
        });
    });
    for (const key of Object.keys(positions)) {
      if (!entries.some((e) => e.key === key)) delete positions[key];
    }
    const used = new Set(Object.values(positions));
    const free = Array.from({ length: 16 }, (_, i) => i).filter(
      (i) => !used.has(i)
    );
    for (const { key } of entries) {
      if (!(key in positions) && free.length) {
        const idx = free.splice(
          Math.floor(Math.random() * free.length),
          1
        )[0];
        positions[key] = idx;
      }
    }
  }

  $: previewWords = (() => {
    const grid = Array(16).fill('—');
    for (const [key, slot] of Object.entries(positions)) {
      const [gi, ai] = key.split('-').map(Number);
      const w = groups[gi]?.answersCsv.split(',').map((x) => x.trim())[ai];
      if (w) grid[slot] = w;
    }
    return grid;
  })();

  async function generate() {
    if (!title || !author) {
      alert('Title and author are required.');
      return;
    }
    const payload: Omit<Puzzle, 'id'> = {
      title,
      author,
      groups: groups.map((g) => ({
        answers: g.answersCsv
          .split(',')
          .map((w) => w.trim())
          .filter(Boolean),
        description: g.description
      }))
    };
    if (!payload.groups.every((g) => g.answers.length === 4)) {
      alert('Each group needs exactly 4 comma-separated words.');
      return;
    }
    const id = await createPuzzle(payload);
    goto(`/puzzles/${id}`);
  }
</script>

<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
  <div class="mx-auto max-w-6xl space-y-6">
    <!-- : stacks mobile, inline sm+ -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <button
        class="w-full sm:w-auto rounded bg-gray-700 px-3 py-1 text-gray-200 hover:bg-gray-600"
        on:click={() => goto('/')}
      >
        ← Back to Board
      </button>
      <h2 class="text-lg font-semibold text-center">Create a New Puzzle</h2>
      <button
        class="w-full sm:w-auto rounded bg-green-600 px-3 py-1 text-white hover:bg-green-500"
        on:click={() => goto('/puzzles')}
      >
        All Puzzles
      </button>
	  <a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a>

    </div>

    <!-- Content: stacked on mobile, side-by-side on md+ -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Preview grid: 2 cols on mobile, 3 on sm, 4 on md+ -->
      <div class="w-full md:w-1/2">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
          {#each previewWords as word}
            <div class="aspect-square flex items-center justify-center rounded bg-gray-800 text-gray-100">
              {word}
            </div>
          {/each}
        </div>
      </div>

      <!-- Form -->
      <div class="w-full md:w-1/2 space-y-6 overflow-auto max-h-[80vh]">
        <input
          bind:value={title}
          placeholder="Puzzle Title"
          class="w-full rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          bind:value={author}
          placeholder="Author"
          class="w-full rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {#each groups as g, i}
          <fieldset class="space-y-2 rounded border border-gray-700 p-4">
            <legend class="px-2 text-gray-300">Group {i + 1}</legend>

            <input
              bind:value={g.answersCsv}
              placeholder="one, two, three, four"
              class="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              bind:value={g.description}
              placeholder="Clue/description"
              class="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </fieldset>
        {/each}

        <button
          on:click={generate}
          class="w-full rounded bg-green-600 py-3 font-semibold text-white shadow hover:bg-green-500"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</main>
