"use client";
import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { Span } from "next/dist/trace";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>();
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>

      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-white rounded-lg shadow-md 
         gap-2 w-full md:w-1/2 xl:w-1/3 relative

        "
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              use the navbar profile to change the avatar or username
            </div>
            {/* cover pic uploads */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        width={48}
                        height={32}
                        alt=""
                        className="
        w-12 h-8 object-cover rounded-md
        "
                      />
                      <span className="text-xs underline text-gray-600">
                        Chnage
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* input */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "jhon"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "smith"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.desc || "It's not who i a underneath"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="desc"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "new york"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="city"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="school"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Apple.Inc"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="work"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "example.edu"}
                  className="p-2 bg-slate-100 rounded-md"
                  name="website"
                />
              </div>
            </div>
            <UpdateButton />

            {state.success && (
              <span className="text-green-500">Profile has been updated</span>
            )}
            {state.error && (
              <span className="text-red-500">something went wrong</span>
            )}

            <div
              className="absolute text-xl right-3 top-3 text-blue-400 cursor-pointer"
              onClick={handleClose}
            >
              close
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
