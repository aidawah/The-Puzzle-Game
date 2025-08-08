import { onRequest } from 'firebase-functions/v2/https';
import { handler }  from '../build/server/index.js';

// forward every request to SvelteKit SSR handler
export const ssr = onRequest((req, res) => {
  return handler(req, res);
});
