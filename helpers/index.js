import colors from "./colors";
import {
  useAuthState,
  useFirestoreQuery,
  useLocalStorage,
  useMedia,
} from "./firbaseHooks";
import { fetchQuizApi } from "./fetchApi";

const clean = (string) => {
  return string
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ouml;/g, "ö")
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
};
