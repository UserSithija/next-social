"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-500 rounded-md mt-3
       text-white p-2 disabled:bg-opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending" : "Send"}
    </button>
  );
};

export default AddPostButton;
