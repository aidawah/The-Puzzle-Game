<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { onUserChanged, signOut } from '$lib/firebase';
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  // keep `user` store in sync
  onUserChanged((u) => user.set(u));
</script>

<div class="flex min-h-screen flex-row md:flex-col">
  <!-- NAV: vertical sidebar on small, horizontal bar on md+ -->
  <nav
    class="bg-gray-800 text-white
           flex flex-col space-y-2 w-48 p-4
           md:flex-row md:space-y-0 md:space-x-4 md:w-full md:px-8 md:py-4"
  >
    <a href="/" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">
      Home
    </a>

    <a
      href="/puzzles"
      class="hover:underline px-2 py-1 rounded hover:bg-gray-700"
    >
      All Puzzles
    </a>
<a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a>
    <a
      href="/create"
      class="hover:underline px-2 py-1 rounded hover:bg-gray-700"
    >
      Create
    </a>

    <!-- Push auth button to the bottom of sidebar on small,
         to the right on top bar at md+ -->
    <div class="mt-auto md:mt-0 md:ml-auto">
      {#if $user}
        <button
          class="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
          on:click={() => {
            signOut();
            goto('/login');
          }}
        >
          Log out
        </button>
      {:else}
        <button
          class="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
          on:click={() => goto('/login')}
        >
          Log in
        </button>
      {/if}
    </div>
  </nav>

  <!-- Main content -->
  <main class="flex-1 p-4 md:px-8 md:py-6">
    <slot />
  </main>
</div>
