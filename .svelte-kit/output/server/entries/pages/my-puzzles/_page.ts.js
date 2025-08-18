import { a as fetchMyPuzzles } from "../../../chunks/firebase.js";
import { redirect } from "@sveltejs/kit";
import { g as get } from "../../../chunks/index.js";
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
