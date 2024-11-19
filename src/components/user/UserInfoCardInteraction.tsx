"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import Link from "next/link";
import React, { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowRequestSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowRequestSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    blocked: isUserBlocked,
    following: isFollowing,
    followingRequestSent: isFollowRequestSent,
  });
  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );
  //block user
  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white rounded-lg py-2 font-medium text-sm">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button className="text-red-400  hover:underline">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
