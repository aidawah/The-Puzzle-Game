import { f as fetchPuzzles } from "../../../chunks/firebase.js";
const load = async () => {
  const puzzles = await fetchPuzzles();
  return { puzzles };
};
export {
  load
};
