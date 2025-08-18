import { getDoc, doc } from "firebase/firestore";
import { d as db } from "../../../../chunks/firebase.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  const snapshot = await getDoc(doc(db, "puzzles", params.id));
  if (!snapshot.exists()) {
    throw error(404, "Puzzle not found");
  }
  const data = snapshot.data();
  return {
    puzzle: {
      id: snapshot.id,
      title: data.title,
      author: data.author,
      groups: data.groups
    }
  };
};
export {
  load
};
