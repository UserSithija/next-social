"use client";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
type RequestWithUser = FollowRequest & { sender: User };
const FriendRequestsList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  return (
    <div>
      {optimisticRequest.map((request) => (
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm flex gap-3 items-center ">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
              alt=""
            />
            <span>
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          {/* buttons */}
          <div className="flex gap-4 cursor-pointer">
            <form action={() => accept(request.id, request.sender.clerkId)}>
              <button>
                <Image src="/accept.png" width={16} height={16} alt="" />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.clerkId)}>
              <button>
                <Image src="/reject.png" width={16} height={16} alt="" />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestsList;
