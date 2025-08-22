import { f as fetchPuzzles } from "../../chunks/firebase.js";
const load = async () => {
  const puzzles = await fetchPuzzles();
  const puzzle = puzzles.length ? puzzles[Math.floor(Math.random() * puzzles.length)] : null;
  return { puzzle };
};
console.log("hello");
export {
  load
};
