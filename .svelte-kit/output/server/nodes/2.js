import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.DHBoBqiN.js","_app/immutable/chunks/NftsHrXe.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/bcjE7qSF.js","_app/immutable/chunks/BromKYUi.js","_app/immutable/chunks/CMZlLvFG.js","_app/immutable/chunks/YPtJtd91.js","_app/immutable/chunks/1skG1GoD.js","_app/immutable/chunks/rFQjRFAn.js","_app/immutable/chunks/Dr_4v5UM.js","_app/immutable/chunks/BqZN-OA-.js"];
export const stylesheets = [];
export const fonts = [];
