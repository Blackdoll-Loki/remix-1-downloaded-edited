const BASE_URL = 'https://dummyjson.com'

type TUser = {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number
  image?: string;
  email?: string;
  favorite?: boolean;
  address?: {
    country?: string;
    city?: string;
    address?: string;
  }
}

type TPost = {
  id?: number;
  title?: string;
  body?: string;
  userId?: number;
  tags?: string[];
  reactions?: {
    likes?: number;
    dislikes?: number;
  }
}

export async function getUsers(): Promise<TUser[]> {
  try {
    const response = await fetch(`${BASE_URL}/users`)
    const { users } = await response.json()
    return users
  } catch (error) {
    return [{ id: 1, firstName: 'Failed to fetch'}]
  }
}

export async function searchUsers(query: string): Promise<TUser[]> {
  try {
    const response = await fetch(`${BASE_URL}/users/search?q=${query}`)
    const { users } = await response.json()
    return users
  }  catch (error) {
    return [{ id: 1, firstName: 'Failed to fetch'}]
  }
}

export async function getUserById(id: string): Promise<TUser> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`)
    const user  = await res.json()
    return user
  } catch (error) {
    return { id: 1, firstName: 'Failed to fetch'}
  }
}

export async function createEmptyUser(): Promise<TUser> {
  try {
    const res = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  const createdUser = await res.json()
  return createdUser
  } catch (error) {
    return { id: 1, firstName: 'Failed to fetch'}
  }
}

export async function updateUser(id: string, data: TUser): Promise<TUser> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data })
    })
    const updatedUser = await res.json()
    return updatedUser
  } catch (error) {
    return { id: 1, firstName: 'Failed to fetch'}
  }
}

export async function deleteUser(id: string): Promise<TUser> {
  const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE', })
  const deletedUser = await res.json()
  return deletedUser
}

export async function getUserPosts(id: string): Promise<TPost[]> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}/posts`)
    const { posts }  = await res.json()
    return posts
  } catch (error) {
    return [{ id: 1, title: 'Failed to fetch posts'}]
  }
}

