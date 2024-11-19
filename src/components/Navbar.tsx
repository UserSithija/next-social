import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import UserButton from "./UserButton";
import UserAuthButton from "./UserAuthButton";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-500">
          FAKEBOOK
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS */}
        <div className="flex  gap-6  text-gray-600">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/home.png"
              width={16}
              height={16}
              alt=""
              className="w-4 h-4"
            />
            <span>homepage</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/friends.png"
              width={16}
              height={16}
              alt=""
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/stories.png"
              width={16}
              height={16}
              alt=""
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div
          className="hidden xl:flex rounded-xl p-2 bg-slate-100
         items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" width={14} height={14} alt="" />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <UserAuthButton />
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
