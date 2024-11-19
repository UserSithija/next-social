import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) return null;
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll text-sm  scrollbar-hide">
      <div className="flex gap-8 w-max">
        {/* STORIES */}

        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
