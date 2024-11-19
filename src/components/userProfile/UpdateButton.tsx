"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-blue-500 w-full p-2 rounded-lg text-white mt-4 disabled:bg-opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
