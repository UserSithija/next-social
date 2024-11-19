import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfoCardInteraction from "../user/UserInfoCardInteraction";
import { notFound } from "next/navigation";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formatDate = createdAtDate.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowRequestSent = false;

  const { userId: currentUserId } = await auth();
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.clerkId,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.clerkId,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);
    const followResquestRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        recevierId: user.clerkId,
      },
    });
    followResquestRes
      ? (isFollowRequestSent = true)
      : (isFollowRequestSent = false);
  }
  if (!currentUserId) return notFound();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center text-gray-500">
        <span>User Information</span>
        {currentUserId === user.clerkId ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 hover:underline">
            See all
          </Link>
        )}
      </div>
      <div className="flex gap-4 items-center font-medium py-2">
        <h2 className="text-xl">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}{" "}
        </h2>
        <span className="text-gray-500">@{user.username}</span>
      </div>
      {user.desc && <p className="text-gray-400">{user.desc}</p>}
      {/* Details */}
      <div className="flex flex-col gap-4">
        {/* location */}
        {user.city && (
          <div className="text-gray-500 flex gap-2 items-center">
            <Image src="/map.png" width={20} height={20} alt="" />
            <p>
              Living in <span className="font-semibold">{user.city}</span>
            </p>
          </div>
        )}
        {/* school */}
        {user.school && (
          <div className="text-gray-500 flex gap-2 items-center">
            <Image src="/school.png" width={20} height={20} alt="" />
            <p>
              Went to <span className="font-semibold">{user.school}</span>
            </p>
          </div>
        )}
        {/* work place */}
        {user.work && (
          <div className="text-gray-500 flex gap-2 items-center">
            <Image src="/work.png" width={20} height={20} alt="" />
            <p>
              Works at <span className="font-semibold">{user.work}</span>
            </p>
          </div>
        )}
      </div>
      {/* social links /joined in */}
      <div className="flex justify-between">
        {/* social link */}
        {user.website && (
          <div className="flex items-center gap-2">
            <Image src="/link.png" width={20} height={20} alt="" />
            <Link href="/" className="text-blue-500 hover:underline">
              {user.website}
            </Link>
          </div>
        )}
        {/* joined in */}
        <div className="flex items-center gap-2">
          <Image src="/date.png" width={20} height={20} alt="" />
          <p className="text-gray-400">
            Joined <span>{formatDate}</span>
          </p>
        </div>
      </div>
      {currentUserId && currentUserId !== user.clerkId && (
        <UserInfoCardInteraction
          userId={user.clerkId}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowRequestSent={isFollowRequestSent}
        />
      )}
    </div>
  );
};

export default UserInfoCard;
