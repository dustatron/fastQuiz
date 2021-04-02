import colors from "./colors";
import {
  useAuthState,
  useFirestoreQuery,
  useLocalStorage,
  useMedia,
} from "./firbaseHooks";
import { fetchQuizApi } from "./fetchApi";
import {
  addNewUser,
  playerHasTakenTurn,
  startGame,
  addUserGuess,
  restartGame,
} from "./gamePlayUtils";

import { advanceSlide, backSlide } from "./slideControls";

const clean = (string) => {
  return string
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ouml;/g, "ö")
    .replace(/&eacute;/g, "ê")
    .replace(/&uuml;/g, "ü");
};

export {
  colors,
  clean,
  useAuthState,
  useFirestoreQuery,
  useLocalStorage,
  useMedia,
  fetchQuizApi,
  addNewUser,
  playerHasTakenTurn,
  startGame,
  addUserGuess,
  restartGame,
  advanceSlide,
  backSlide,
};
