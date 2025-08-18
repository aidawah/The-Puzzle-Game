import { a as pop, p as push } from "../../../chunks/index2.js";
import "../../../chunks/firebase.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "../../../chunks/state.svelte.js";
function _page($$payload, $$props) {
  push();
  $$payload.out.push(`<main class="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 sm:p-8"><div class="w-full max-w-md space-y-8"><h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Log in or Sign Up</h1> <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"><button class="w-full sm:flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-center">Continue with Google</button> <button class="w-full sm:flex-1 px-6 py-3 bg-black hover:opacity-90 rounded-lg text-white text-center">Continue with Apple</button></div></div></main>`);
  pop();
}
export {
  _page as default
};
