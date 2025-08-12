import { customAlphabet } from "nanoid";

export function generateSlug() {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const nanoid = customAlphabet(alphabet);

  return nanoid();
}
