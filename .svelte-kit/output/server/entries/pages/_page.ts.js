import { f as fetchPuzzles } from "../../chunks/firebase.js";
const load = async () => {
  const puzzles = await fetchPuzzles();
  return {
    puzzle: puzzles[0] ?? null
  };
};
export {
  load
};
