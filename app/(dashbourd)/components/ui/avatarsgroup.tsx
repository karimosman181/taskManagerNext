"use client";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrganizationUsersItem } from "@/types";

interface OrganizationUsersProps {
  items: OrganizationUsersItem[];
}

export default function AvatarsGroup({ items }: OrganizationUsersProps) {
  const [avatarsTotal, setAvatarsTotal] = useState(0);
  const [users, setUsers] = useState<OrganizationUsersItem[]>()

  useEffect(() => {

    setUsers(items);
    setAvatarsTotal(items.slice(3).length);

  }, [items]);

  return (
    <>
      <div className="flex -space-x-3 *:ring *:ring-white">
        {users && users.slice(0, 3).map((avatar, index) => {
          return (
            <Avatar key={index}>
              <AvatarImage src={avatar.User.avatar} />
              <AvatarFallback>
                {avatar.User.firstName.slice(0, 1) +
                  "" +
                  avatar.User.lastName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          );
        })}
        {avatarsTotal > 0 ? (
          <>
            <Avatar>
              <AvatarFallback className="bg-blue-500 text-white">
                {" "}
                {"+" + avatarsTotal}
              </AvatarFallback>
            </Avatar>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
