import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import { Like, Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};
const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId: currentUserId } = await auth();
  return (
    <div className="flex flex-col gap-4  ">
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {" "}
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {currentUserId === post.user.clerkId && <PostInfo postId={post.id} />}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative ">
            <Image
              src={post.img}
              fill
              alt=""
              className="cursor-pointer object-cover rounded-md "
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INRERACTION */}
      <Suspense fallback="loading..">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
