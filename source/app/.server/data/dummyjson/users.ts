import { getUrl } from "./utils"
import type { DummyUser } from "./interfaces"

export async function getUsers(): Promise<DummyUser[]> {
  const response = await fetch(getUrl(`/users`))
  const { users } = await response.json()
  return users
}

export async function searchUsers(query: string): Promise<DummyUser[]> {
  const url = getUrl(`/users/search?q=${query}`);
  url.searchParams.append('q', query)

  const response = await fetch(url)
  const { users } = await response.json()
  return users
}

export async function getUserById(id: string): Promise<DummyUser> {
  const res = await fetch(getUrl(`/users/${id}`))
  const user = await res.json()
  return user
}

export async function createEmptyUser(): Promise<DummyUser> {
  const res = await fetch(getUrl(`/users/add`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  const createdUser = await res.json()
  return createdUser
}

export async function updateUser(id: string, data: DummyUser): Promise<DummyUser> {
  const res = await fetch(getUrl(`/users/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data })
  })
  const updatedUser = await res.json()
  return updatedUser
}

export async function deleteUser(id: string): Promise<DummyUser> {
  const res = await fetch(getUrl(`/users/${id}`), { method: 'DELETE' })
  const deletedUser = await res.json()
  return deletedUser
}
