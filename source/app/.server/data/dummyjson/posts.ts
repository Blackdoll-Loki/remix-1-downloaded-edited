import { DummyPost } from "./interfaces"
import { getUrl } from "./utils"

export async function getUserPosts(id: string): Promise<DummyPost[]> {
  const res = await fetch(getUrl(`/users/${id}/posts`))
  const { posts } = await res.json()
  return posts
}
