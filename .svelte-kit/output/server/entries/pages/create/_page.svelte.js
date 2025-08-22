import { d as ensure_array_like, e as escape_html, h as attr, a as pop, p as push } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/firebase.js";
import { u as user } from "../../../chunks/user.js";
import { g as get } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  let previewWords;
  if (!get(user)) goto();
  let title = "";
  let author = "";
  let groups = Array.from({ length: 4 }, () => ({ answersCsv: "", description: "" }));
  let positions = {};
  {
    const entries = [];
    groups.forEach((g, gi) => {
      g.answersCsv.split(",").map((w) => w.trim()).forEach((w, ai) => {
        if (w) entries.push({ key: `${gi}-${ai}`, word: w });
      });
    });
    for (const key of Object.keys(positions)) {
      if (!entries.some((e) => e.key === key)) delete positions[key];
    }
    const used = new Set(Object.values(positions));
    const free = Array.from({ length: 16 }, (_, i) => i).filter((i) => !used.has(i));
    for (const { key } of entries) {
      if (!(key in positions) && free.length) {
        const idx = free.splice(Math.floor(Math.random() * free.length), 1)[0];
        positions[key] = idx;
      }
    }
  }
  previewWords = (() => {
    const grid = Array(16).fill("—");
    for (const [key, slot] of Object.entries(positions)) {
      const [gi, ai] = key.split("-").map(Number);
      const w = groups[gi]?.answersCsv.split(",").map((x) => x.trim())[ai];
      if (w) grid[slot] = w;
    }
    return grid;
  })();
  const each_array = ensure_array_like(previewWords);
  const each_array_1 = ensure_array_like(groups);
  $$payload.out.push(`<main class="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8"><div class="mx-auto max-w-6xl space-y-6"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0"><button class="w-full sm:w-auto rounded bg-gray-700 px-3 py-1 text-gray-200 hover:bg-gray-600">← Back to Board</button> <h2 class="text-lg font-semibold text-center">Create a New Puzzle</h2> <button class="w-full sm:w-auto rounded bg-green-600 px-3 py-1 text-white hover:bg-green-500">All Puzzles</button> <a href="/my-puzzles" class="hover:underline px-2 py-1 rounded hover:bg-gray-700">My Puzzles</a></div> <div class="flex flex-col md:flex-row gap-6"><div class="w-full md:w-1/2"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let word = each_array[$$index];
    $$payload.out.push(`<div class="aspect-square flex items-center justify-center rounded bg-gray-800 text-gray-100">${escape_html(word)}</div>`);
  }
  $$payload.out.push(`<!--]--></div></div> <div class="w-full md:w-1/2 space-y-6 overflow-auto max-h-[80vh]"><input${attr("value", title)} placeholder="Puzzle Title" class="w-full rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"/> <input${attr("value", author)} placeholder="Author" class="w-full rounded border border-gray-700 bg-gray-800 p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"/> <!--[-->`);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let g = each_array_1[i];
    $$payload.out.push(`<fieldset class="space-y-2 rounded border border-gray-700 p-4"><legend class="px-2 text-gray-300">Group ${escape_html(i + 1)}</legend> <input${attr("value", g.answersCsv)} placeholder="one, two, three, four" class="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"/> <input${attr("value", g.description)} placeholder="Clue/description" class="w-full rounded border border-gray-600 bg-gray-800 p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"/></fieldset>`);
  }
  $$payload.out.push(`<!--]--> <button class="w-full rounded bg-green-600 py-3 font-semibold text-white shadow hover:bg-green-500">Generate</button></div></div></div></main>`);
  pop();
}
export {
  _page as default
};
