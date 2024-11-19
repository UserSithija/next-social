import React, { Suspense } from "react";
import FriendRequest from "./FriendRequest";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import UserInfoCard from "./userProfile/UserInfoCard";
import UserMediaCard from "./userProfile/UserMediaCard";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className=" flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="lg" />
    </div>
  );
};

export default RightMenu;
