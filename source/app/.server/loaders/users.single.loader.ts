import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserById } from "../data/dummyjson";

export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const user = await getUserById(params.userId);
  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }
  return { user };
};
