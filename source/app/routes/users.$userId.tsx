import React from "react";
import { NavLink, Outlet, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { usersSingleLoader } from "../.server/loaders/users.single.loader";

export const loader = usersSingleLoader;

export default function User() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 items-center my-8 text-3xl text-blue-500 justify-center">
        <NavLink
          to={`/users/${user.id}/info`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Info
        </NavLink>
        <NavLink
          to={`/users/${user.id}/edit`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Edit
        </NavLink>
        <NavLink
          to={`/users/${user.id}/posts`}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          Posts
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
