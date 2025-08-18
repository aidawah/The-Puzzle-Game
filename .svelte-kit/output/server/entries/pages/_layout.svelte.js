import { b as store_get, c as slot, u as unsubscribe_stores, a as pop, p as push } from "../../chunks/index2.js";
import { o as onUserChanged } from "../../chunks/firebase.js";
import { u as user } from "../../chunks/user.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  onUserChanged((u) => user.set(u));
  $$payload.out.push(`<div class="flex min-h-screen flex-row md:flex-col"><nav class="bg-gray-800 text-white flex flex-col space-y-2 w-48 p-4 md:flex-row md:space-y-0 md:space-x-4 md:w-full md:px-8 md:py-4"><a href="/" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">Home</a> <a href="/puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">All Puzzles</a> <a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a> <a href="/create" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">Create</a> <div class="mt-auto md:mt-0 md:ml-auto">`);
  if (store_get($$store_subs ??= {}, "$user", user)) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<button class="bg-red-600 px-3 py-1 rounded hover:bg-red-500">Log out</button>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<button class="bg-green-600 px-3 py-1 rounded hover:bg-green-500">Log in</button>`);
  }
  $$payload.out.push(`<!--]--></div></nav> <main class="flex-1 p-4 md:px-8 md:py-6"><!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></main></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
