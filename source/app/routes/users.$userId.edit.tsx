import React from "react";
import { Form, redirect, useLoaderData, useMatches } from "@remix-run/react";
import type { ActionFunctionArgs, } from "@remix-run/node";

import { updateUser } from "../.server/data/dummyjson/users";
import { usersSingleLoader } from "../.server/loaders/users.single.loader";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateUser(params.userId, updates);
  return redirect(`/users/${params.userId}/edit`);
};

export const loader = usersSingleLoader;

export default function EditUser() {
  const { user } = useLoaderData<typeof loader>();

  console.log(useMatches());

  return (
    <Form key={user.id} method="post" className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span>Name</span>
        <input
          defaultValue={user.firstName}
          name="firstNane"
          type="text"
          placeholder="First name"
        />
        <input
          defaultValue={user.lastName}
          name="lastName"
          placeholder="Last name"
          type="text"
        />
      </div>

      <label className="space-x-2">
        <span>Email</span>
        <input defaultValue={user.email} name="email" type="text" />
      </label>

      <label className="space-x-2">
        <span>Avatar URL</span>
        <input
          defaultValue={user.image}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>

      <div className="space-x-4">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
    </Form>
  );
}
