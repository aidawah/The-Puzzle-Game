import { d as ensure_array_like, j as attr, e as escape_html, i as bind_props, a as pop, p as push } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "../../../chunks/state.svelte.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  $$payload.out.push(`<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8"><div class="mx-auto max-w-4xl space-y-6"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"><h1 class="text-2xl md:text-3xl font-bold">Custom Puzzles</h1> <button class="self-start sm:self-auto rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">Create Puzzle</button></div> `);
  if (data.puzzles.length === 0) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p>No puzzles yet. Start by creating one!</p>`);
  } else {
    $$payload.out.push("<!--[!-->");
    const each_array = ensure_array_like(data.puzzles);
    $$payload.out.push(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let p = each_array[$$index];
      $$payload.out.push(`<a${attr("href", `/puzzles/${p.id}`)} class="block rounded-lg bg-gray-800 p-4 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"><h2 class="text-xl font-semibold text-gray-100">${escape_html(p.title)}</h2> <p class="mt-1 text-gray-400">by ${escape_html(p.author)}</p></a>`);
    }
    $$payload.out.push(`<!--]--></div>`);
  }
  $$payload.out.push(`<!--]--></div></main>`);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
