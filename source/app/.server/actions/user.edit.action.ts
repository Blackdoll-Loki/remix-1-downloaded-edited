import { DummyUser, updateUser } from "../data/dummyjson";
import { redirect } from "@remix-run/react";
import type { ActionFunctionArgs, } from "@remix-run/node";


export const editAction = async ({ params, request }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates: any = Object.fromEntries(formData);
  await updateUser(params.userId, updates);
  return redirect(`/users/${params.userId}/edit`);
};
