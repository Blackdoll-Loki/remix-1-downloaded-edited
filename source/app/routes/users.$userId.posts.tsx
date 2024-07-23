import React from "react";
import { useLoaderData } from "@remix-run/react";
import { usersPostsLoader } from "../.server/loaders/users.posts.loader";


export const loader = usersPostsLoader;

export default function UserPosts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="w-3/4 p-4 mx-auto">
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="p-2 cursor-pointer">
            <details>
              <summary>{post.title}</summary>
              <div>{post.body}</div>
            </details>
            <div className="flex gap-2 items-center justify-between text-xs">
              <div>
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-300  py-0.5 px-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <span>👍{post.reactions?.likes}</span> /{" "}
                <span>{post.reactions?.dislikes}👎</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
