import { d as ensure_array_like, b as store_get, e as escape_html, f as attr_class, h as stringify, u as unsubscribe_stores, i as bind_props, a as pop, p as push } from "../../../../chunks/index2.js";
import { w as writable } from "../../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "../../../../chunks/state.svelte.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const board = writable([]);
  const selected = writable(/* @__PURE__ */ new Set());
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$board", board));
  $$payload.out.push(`<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8"><div class="mx-auto max-w-4xl space-y-6"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"><h1 class="text-2xl md:text-3xl font-bold text-center">${escape_html(data.puzzle.title)} — by ${escape_html(data.puzzle.author)}</h1> <div class="flex justify-center sm:justify-end space-x-2"><button class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 w-full sm:w-auto">All Puzzles</button> <button class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500 w-full sm:w-auto">Create Puzzle</button></div></div> <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let word = each_array[$$index];
    $$payload.out.push(`<button${attr_class(`aspect-square flex items-center justify-center rounded-lg transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$selected", selected).has(word) ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700")}`)}>${escape_html(word)}</button>`);
  }
  $$payload.out.push(`<!--]--></div> <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"><button class="w-full sm:w-auto rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500">Shuffle</button> <button class="w-full sm:w-auto rounded bg-yellow-400 px-6 py-2 text-gray-900 hover:bg-yellow-300">Clear</button> <button class="w-full sm:w-auto rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500">Submit</button></div></div></main>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
