import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendRequestsList from "./userProfile/FriendRequestsList";

const FriendRequest = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const requests = await prisma.followRequest.findMany({
    where: {
      recevierId: userId,
    },
    include: {
      sender: true,
    },
  });
  console.log(requests);

  if (requests.length === 0) return null;
  console.log(requests);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center text-gray-500">
        <span>Friend Requests</span>
        <Link href="/" className="text-blue-500 hover:underline">
          See all
        </Link>
      </div>
      {/* BOTTOM */}

      <FriendRequestsList requests={requests} />
    </div>
  );
};

export default FriendRequest;
