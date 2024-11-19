"use client";
import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
type CommentWithUser = Comment & { user: User };
const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: string;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!user || !desc) return;
    addOptimisticComment({
      id: String(Math.random()),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: "",
        clerkId: user.id,
        username: "sending please wait",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        desc: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/*WRITE  */}
      {user && (
        <div className="flex items-center gap-4 ">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
            alt=""
          />

          <form
            action={add}
            className="flex flex-1 items-center justify-center 
        bg-slate-100 rounded-xl  text-sm  py-2 w-full "
          >
            <input
              type="text"
              placeholder="Write a comment"
              className="bg-transparent outline-none flex-1 
            
            "
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image src="/emoji.png" width={16} height={16} alt="" />
          </form>
        </div>
      )}
      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        {optimisticComment.map((comment) => (
          <div key={comment.id} className="flex gap-4 mt-6 justify-between">
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full "
              alt=""
            />
            {/* DESC */}
            <div className="flex flex-col  gap-2 flex-1">
              <span className="text-lg text-gray-600">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              {/* LIKE AND REPLY */}
              <div className="flex gap-8 items-center text-xs">
                <div className="text-gray-500 flex  gap-2 justify-center items-center py-2">
                  <Image
                    src="/like.png"
                    width={12}
                    height={12}
                    alt=""
                    className="cursor-pointer"
                  />
                  |<span>134</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
