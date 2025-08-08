import { a as fetchMyPuzzles } from "../../../chunks/firebase.js";
import { r as redirect } from "../../../chunks/index.js";
import { g as get } from "../../../chunks/index2.js";
import { u as user } from "../../../chunks/user.js";
const load = async () => {
  if (!get(user)) {
    throw redirect(302, "/login");
  }
  const puzzles = await fetchMyPuzzles();
  return { puzzles };
};
export {
  load
};
