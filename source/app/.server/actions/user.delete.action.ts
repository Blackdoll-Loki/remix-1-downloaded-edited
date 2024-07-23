import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteUser } from "../data/dummyjson";

export const deleteAction = async ({ params }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  await deleteUser(params.userId);
  return redirect("/");
};
