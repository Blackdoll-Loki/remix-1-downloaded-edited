import { DUMMY_BASE_URL } from "./constants"

export const getUrl = (uri: string): URL => {
  return new URL(uri, DUMMY_BASE_URL)
}
