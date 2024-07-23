export type DummyUserAddress = {
  country: string;
  city: string;
  address: string;
}

export type DummyUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number
  image: string;
  email: string;
  favorite: boolean;
  address: DummyUserAddress;
}

export type DummyPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    id: number;
    likes: number;
    dislikes: number;
  }
}
