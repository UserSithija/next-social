"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

const PostInfo = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false);
  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div
          className="
    bg-white p-4 rounded-lg flex flex-col gap-2
    text-xs shadow-xl w-32 custom-style absolute
    "
        >
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
