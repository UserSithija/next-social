"use client";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <div
        className="cursor-pointer flex flex-col gap-[4.5px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-6 h-1 rounded-sm bg-blue-500 origin-left duration-500 ease-in-out ${
            isOpen ? "rotate-45" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 rounded-sm duration-500 ease-in-out bg-blue-500   ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 rounded-sm bg-blue-500 origin-left duration-500 ease-in-out  ${
            isOpen ? "-rotate-45" : ""
          }`}
        ></div>
      </div>
      {isOpen && (
        <div className=" absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-2 font-medium text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/">Friends</Link>
          <Link href="/">Groups</Link>
          <Link href="/">Stories</Link>
          <Link href="/">Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
