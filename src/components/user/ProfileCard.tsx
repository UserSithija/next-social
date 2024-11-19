import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;
  const profileId = "2";
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-6">
      <div className="relative h-16 w-full">
        <Image
          src={user.cover || "/noCover.png"}
          fill
          className="object-cover rounded-md"
          alt=""
        />

        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 rounded-full absolute -bottom-6  left-0 right-0 m-auto ring-2 ring-white object-cover"
        />
      </div>
      {/* Details */}
      <div className="flex flex-col  items-center justify-center gap-2">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        {/* about */}
        <div className="text-xs text-gray-400 flex gap-2">
          <span>💙💙💙</span>
          <p>
            {user._count.followers} <span>Followers</span>
          </p>
        </div>
        <Link
          href={`/profile/${user.clerkId}`}
          className="bg-blue-500 p-2  text-sm text-white rounded-md"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
