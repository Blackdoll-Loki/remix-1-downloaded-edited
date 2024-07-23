import type { MetaFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return redirect("/users");
};

export default function Index() {
  return <Outlet />;
}
