import adapter from '@sveltejs/adapter-static';    // see step 2
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // where to write the built files:
      pages: 'build',
      assets: 'build',
      // any 404 should serve this:
      fallback: 'index.html'
    })

  }
};

export default config;
