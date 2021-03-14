import colors from "./colors";
import {
  useAuthState,
  useFirestoreQuery,
  useLocalStorage,
  useMedia,
} from "./firbaseHooks";

const clean = (string) => {
  return string
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ouml;/g, "ö");
};

export {
  colors,
  clean,
  useAuthState,
  useFirestoreQuery,
  useLocalStorage,
  useMedia,
};
