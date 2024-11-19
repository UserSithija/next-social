"use client";
import { switchLike } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: string;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, user } = useUser();
  const [likesState, setLikesState] = useState({
    likeCount: likes.length,
    isLiked: user?.id ? likes.includes(user.id) : false,
  });
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likesState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      await switchLike(postId);
      setLikesState((state) => {
        return {
          likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
          isLiked: !state.isLiked,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl text-gray-600">
            <form action={likeAction}>
              <button>
                <Image
                  src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                  width={16}
                  height={16}
                  alt=""
                  className="cursor-pointer"
                />
              </button>
            </form>
            |
            <span>
              {optimisticLike.likeCount}{" "}
              <span className="hidden md:inline">Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl text-gray-600">
            <Image
              src="/comment.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            |
            <span>
              {commentNumber} <span className="hidden md:inline">Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl text-gray-600">
            <Image
              src="/share.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            |
            <span>
              123 <span className="hidden md:inline">Shares</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
