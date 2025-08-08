import * as universal from '../entries/pages/puzzles/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/puzzles/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/puzzles/+page.ts";
export const imports = ["_app/immutable/nodes/6.CZ2jwRZz.js","_app/immutable/chunks/CYy9vh4R.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BntYITJV.js","_app/immutable/chunks/DfyscB-W.js","_app/immutable/chunks/Cm2BqtFm.js","_app/immutable/chunks/DIZefaZn.js","_app/immutable/chunks/9ahP_F_U.js","_app/immutable/chunks/Cpirqydb.js","_app/immutable/chunks/Db9_vGeA.js","_app/immutable/chunks/8teCs59O.js"];
export const stylesheets = [];
export const fonts = [];
