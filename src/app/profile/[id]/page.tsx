import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Feed from "@/components/user/Feed";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const user = await prisma.user.findFirst({
    where: { clerkId: id },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();
  const { userId: currentUserId } = await auth();
  let isBlocked: Boolean;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.clerkId,
        blockedId: currentUserId,
      },
    });
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }
  if (isBlocked) return notFound();
  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT */}
      <div className=" hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      {/* CENTER FEED */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.png"}
                alt=""
                fill
                className="object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="
                absolute left-0 right-0 m-auto -bottom-16
                rounded-full w-32 h-32 ring-4 ring-white"
              />
            </div>
            {/* username */}
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed userId={user.clerkId} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};
export default ProfilePage;
