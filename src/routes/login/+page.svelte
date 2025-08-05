<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { signInWithGoogle, signInWithApple } from '$lib/firebase';
  import { goto } from '$app/navigation';

  async function loginGoogle() {
    try {
      await signInWithGoogle();
      goto('/create');
    } catch (e) {
      alert('Google sign-in failed: ' + e);
    }
  }

  async function loginApple() {
    try {
      await signInWithApple();
      goto('/create');
    } catch (e) {
      alert('Apple sign-in failed: ' + e);
    }
  }
</script>

<main class="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 sm:p-8">
  <div class="w-full max-w-md space-y-8">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
      Log in or Sign Up
    </h1>

    <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
      <button
        class="w-full sm:flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-center"
        on:click={loginGoogle}
      >
        Continue with Google
      </button>
      <button
        class="w-full sm:flex-1 px-6 py-3 bg-black hover:opacity-90 rounded-lg text-white text-center"
        on:click={loginApple}
      >
        Continue with Apple
      </button>
    </div>
  </div>
</main>
