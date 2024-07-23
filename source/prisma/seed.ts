import { PrismaClient } from "@prisma/client";
import { i } from "vite/dist/node/types.d-aGj9QkWt";
import { DummyUser } from "~/.server/data/dummyjson";
import { getUrl } from "~/.server/data/dummyjson";
import type { DummyPost } from "~/.server/data/dummyjson";
const prisma = new PrismaClient()


const getData = async(id?: number, path = '') => {
  const userURL = getUrl(`user/${id}${path}`);
  const res = await fetch(userURL);
  const data = await res.json();
  return data;
}

type TUser = DummyUser & {
  address: {
    country: string,
    city: string,
    address: string
  }
}

async function dataSeed() {
  const totalUsersAmount = 208;
  const dummyUsers = [];

  for(let i = 0; i < totalUsersAmount; i++){
    let data = await getData(i);
    dummyUsers.push(data)
  }

  const users = dummyUsers.map((user: TUser)=>{
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      image: user.image,
      email: user.email,
      favorite: user.favorite,
      address: {
        create: {
          country: user.address.country,
          city: user.address.city,
          address: user.address.address
        }
      }
    };
  })

  let dummyPosts: DummyPost[] = [];
  for (let i = 0; i < dummyUsers.length; i += 10) {
    const chunk = dummyUsers.slice(i, i + 10);
    const chunkPosts = await Promise.all(
      chunk.map(async (user: TUser) => {
        const userPosts = await getData(user.id, '/posts');
        return userPosts.posts;
      })
    );
    dummyPosts = dummyPosts.concat(chunkPosts.flat());
  }

  const userPosts = dummyPosts.map((el) => {
    return {
      id: el.id,
      title: el.title,
      body: el.body,
      tags: el.tags,
      userId: el.userId,
      reactionId: el.reactions.id,
      likes: el.reactions.likes,
      dislikes: el.reactions.dislikes
    };
  });

  await prisma.user.createMany({ data: users });
  await prisma.post.createMany({ data: userPosts })
}

dataSeed().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
