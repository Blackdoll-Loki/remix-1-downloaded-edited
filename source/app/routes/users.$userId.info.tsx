import React from "react";
import { useNavigation, useRouteLoaderData } from "@remix-run/react";
import { usersSingleLoader } from "../.server/loaders/users.single.loader";


export default function UserInfo() {
  const routeData = useRouteLoaderData<typeof usersSingleLoader>("routes/users.$userId");
  const { state } = useNavigation();

  if (!routeData) {
    return null;
  }
  const { user } = routeData;

  return (
    <div className="flex flex-col gap-4 items-center">
      {state === "loading" ? (
        <div className="spinner size-20"></div>
      ) : (
        <div className="flex gap-4 items-center">
          <img src={user.image} alt="user" className="size-32" />
          <div>
            <div className="text-2xl">
              {user.firstName} {user.lastName},{" "}
              <span className="text-gray-600">age {user.age}</span>
            </div>
            <div>{user.address?.country}</div>
            <div>
              {user.address?.city}, {user.address?.address}
            </div>
            <div>Email: {user.email}</div>
            <div>Favorite:{user.favorite ? " ⭐" : " ❌"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
