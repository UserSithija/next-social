import Image from "next/image";
import React from "react";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <span className="text-gray-500">Birthdays</span>

      <div className="flex justify-between items-center">
        <div className="text-gray-500 font-medium flex items-center gap-5 py-3">
          {" "}
          <Image
            src="https://images.pexels.com/photos/7330346/pexels-photo-7330346.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span>Conor Mcgregor</span>
        </div>
        <button className="py-1 px-3 bg-blue-500 text-white rounded-xl text-sm">
          Celebrate
        </button>
      </div>
      {/* BOTTOM */}
      <div className="bg-slate-200 p-2 rounded-lg flex items-center  gap-4 ">
        <Image src="/gift.png" width={24} height={24} alt="" />
        <div className="pt-2">
          <span className="text-gray-900 font-medium">Upcoming Birthdays</span>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
