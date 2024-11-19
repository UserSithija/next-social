import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user.clerkId,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center text-gray-500">
        <span>User Media</span>
        <Link href="/" className="text-blue-500 hover:underline">
          See all
        </Link>
      </div>
      {/* POST CONTAINER */}
      <div className="flex   gap-4 flex-wrap  justify-between ">
        {postWithMedia.length
          ? postWithMedia.map((item) => (
              <div className="relative w-1/5 h-24">
                <Image
                  key={item.id}
                  src={item.img!}
                  alt=""
                  fill
                  className="rounded-md object-cover "
                />
              </div>
            ))
          : "no media found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
