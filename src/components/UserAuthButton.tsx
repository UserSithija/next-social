"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserAuthButton = () => {
  return (
    <>
      <ClerkLoading>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        ></div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className="cursor-pointer">
            <Image src="/people.png" width={20} height={20} alt="" />
          </div>
          <div className="cursor-pointer">
            <Image src="/messages.png" width={20} height={20} alt="" />
          </div>
          <div className="cursor-pointer">
            <Image src="/notifications.png" width={20} height={20} alt="" />
          </div>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex justify-center items-center h-6 w-6 rounded-full border-2 border-gray-500">
            <Image src="/noAvatar.png" width={20} height={20} alt="" />
          </div>
          <Link href="/sign-in" className="text-sm">
            {" "}
            Login/Register
          </Link>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
};

export default UserAuthButton;
