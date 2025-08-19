import adapter from '@sveltejs/adapter-static';    // see step 2
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),

    kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: 'index.html' }),
    prerender: { entries: [] }

  }
};

export default config;
