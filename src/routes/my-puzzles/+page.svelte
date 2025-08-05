<!-- src/routes/my-puzzles/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Puzzle } from '$lib/firebase';
  export let data: { puzzles: Puzzle[] };
</script>

<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
  <div class="mx-auto max-w-4xl space-y-6">
    <h1 class="text-2xl md:text-3xl font-bold">My Puzzles</h1>

    {#if data.puzzles.length === 0}
      <div class="space-y-4">
        <p>You haven’t created any puzzles yet.</p>
        <button
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          on:click={() => goto('/create')}
        >
          Create Your First Puzzle
        </button>
      </div>
    {:else}
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

    <div class="pt-6">
      <button
        class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        on:click={() => goto('/puzzles')}
      >
        ← Back to All Puzzles
      </button>
    </div>
  </div>
</main>
