import { d as ensure_array_like, b as store_get, e as escape_html, f as attr_class, h as stringify, u as unsubscribe_stores, i as bind_props, a as pop, p as push } from "../../chunks/index3.js";
import { w as writable } from "../../chunks/index2.js";
import "../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  const board = writable([]);
  const selected = writable(/* @__PURE__ */ new Set());
  if (data.puzzle) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$board", board));
    $$payload.out += `<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8"><div class="mx-auto max-w-4xl space-y-8"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"><h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center">${escape_html(data.puzzle.title)} — by ${escape_html(data.puzzle.author)}</h1> <div class="flex justify-center sm:justify-end space-x-2"><button class="w-full sm:w-auto rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">All Puzzles</button> <a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a> <button class="w-full sm:w-auto rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">Create</button></div></div> <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let word = each_array[$$index];
      $$payload.out += `<button${attr_class(`aspect-square flex items-center justify-center rounded-lg transition-colors duration-200 ${stringify(store_get($$store_subs ??= {}, "$selected", selected).has(word) ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700")}`)}>${escape_html(word)}</button>`;
    }
    $$payload.out += `<!--]--></div> <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"><button class="w-full sm:w-auto rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500">Shuffle</button> <button class="w-full sm:w-auto rounded bg-yellow-500 px-6 py-2 text-gray-900 hover:bg-yellow-400">Clear</button> <button class="w-full sm:w-auto rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500">Submit</button></div> <div class="text-center pt-4"><a href="/create" class="inline-block rounded bg-indigo-600 px-6 py-2 text-white shadow hover:bg-indigo-500">Create a Puzzle</a></div></div></main>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<main class="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 p-4"><div class="text-center space-y-4"><p>No puzzle loaded.</p> <a href="/create" class="inline-block rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-500">Create one →</a></div></main>`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
