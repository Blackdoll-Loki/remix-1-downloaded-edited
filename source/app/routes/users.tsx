import React from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { createEmptyUser } from "../.server/data/dummyjson/users";
import { usersLoader } from "../.server/loaders/users.loader"

export const action = async () => {
  const user = await createEmptyUser();
  return redirect(`/users/${user.id}/edit`);
};

export const loader = usersLoader;

export default function Users() {
  const { users, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div className="flex">
      <aside className="min-w-96 h-dvh bg-gray-300 p-4 overflow-y-scroll">
        <div className="flex justify-between items-center gap-2 mb-4">
          <Form
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
            className="relative"
          >
            <input
              type="text"
              name="q"
              autoComplete="off"
              className="p-2 w-full"
            />
            {searching && (
              <div className="absolute size-6 spinner top-2 right-2"></div>
            )}
          </Form>
          <Form method="POST">
            <button className="text-blue-500 font-bold border">New</button>
          </Form>
        </div>

        <ul className={`space-y-2 ${searching ? "text-gray-500" : ""}`}>
          {users.map((user) => (
            <li key={user.id}>
              <NavLink to={`/users/${user.id}/info`}>
                <div>
                  {user.firstName} {user.lastName}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <Outlet />
    </div>
  );
}
