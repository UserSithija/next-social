"use client";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
type StoryWithUser = Story & { user: User };
const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();
  const { user, isLoaded } = useUser();

  const [optimisticStories, addOptimisticStories] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!img?.secure_url) return;
    addOptimisticStories({
      id: String(Math.random()),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,

      user: {
        id: "",
        clerkId: userId,
        username: "sending..",
        avatar: user?.imageUrl || "/noAvatar.png",
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
      const createdStory = await addStory(img.secure_url);

      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                onClick={() => open()}
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                width={80}
                height={80}
                alt=""
                className="w-20 h-20 rounded-full ring-2 object-cover "
              />
              {img ? (
                <form action={add}>
                  <button
                    className="text-xs bg-blue-500 p-1 rounded-md to-white
          "
                  >
                    Send
                  </button>
                </form>
              ) : (
                <span className="text-xs font-mono">Add a story</span>
              )}
              <div className="absolute text-6xl text-gray-200 top-1">+</div>
            </div>
          );
        }}
      </CldUploadWidget>

      {optimisticStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Image
            src={story.img}
            width={80}
            height={80}
            alt=""
            className="w-20 h-20 rounded-full ring-2 "
          />
          <span className="text-xs font-mono">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
