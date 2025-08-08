<!-- src/routes/puzzles/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  export let data: {
    puzzles: { id: string; title: string; author: string }[];
  };
</script>

<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
  <div class="mx-auto max-w-4xl space-y-6">
    <!-- Header: stacks on mobile, inline on larger screens -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <h1 class="text-2xl md:text-3xl font-bold">Custom Puzzles</h1>
      <button
        class="self-start sm:self-auto rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
        on:click={() => goto('/create')}
      >
        Create Puzzle
      </button>
    </div>

    {#if data.puzzles.length === 0}
      <p>No puzzles yet. Start by creating one!</p>
    {:else}
      <!-- Responsive grid: 1 col on mobile, 2 on sm, 3 on md+ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each data.puzzles as p}
          <a
            href={`/puzzles/${p.id}`}
            class="block rounded-lg bg-gray-800 p-4 hover:bg-gray-700 transition
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <h2 class="text-xl font-semibold text-gray-100">{p.title}</h2>
            <p class="mt-1 text-gray-400">by {p.author}</p>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</main>
