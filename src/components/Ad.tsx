import Image from "next/image";
import React from "react";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* top */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" width={16} height={16} alt="" />
      </div>
      {/* bottom */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-2/4" : size === "md" ? "h-32" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/28957623/pexels-photo-28957623/free-photo-of-aerial-night-view-of-paris-featuring-les-invalides.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            fill
            alt=""
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/28957623/pexels-photo-28957623/free-photo-of-aerial-night-view-of-paris-featuring-les-invalides.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            width={24}
            height={24}
            alt=""
            className=" w-6 h-6 rounded-full object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={`${size === "sm" ? "text-xs" : "text-sm"} `}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing el"
            : size === "md"
            ? " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt natus tenetur,"
            : " iste blanditiis rerum, expedita impedit voluptates exercitationem commodi molestiae quaerat doloremque numquam ullam libero praesentium reprehenderit ab, asperiores nesciunt."}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
