import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ userId }: { userId?: string }) => {
  const { userId: currentUserId } = await auth();
  let posts: any[] = [];
  if (userId) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          clerkId: userId,
        },
      },
      include: {
        user: true,
        likes: {
          select: { userId: true },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (!userId && currentUserId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: currentUserId,
      },
      select: {
        followingId: true,
      },
    });
    const followingIds = following.map((f) => f.followingId);
    const ids = [currentUserId, ...followingIds];
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: { userId: true },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-12">
      {posts?.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found!"}
    </div>
  );
};

export default Feed;
