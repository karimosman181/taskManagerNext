"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { getUserSelectedOrgData } from "@/lib/client/auth";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarsGroup from "./ui/avatarsgroup";
import { useApp } from "@/contexts/AppContext";

async function getOrganization(org_id: string) {
  const response = await fetch("/api/account/organizations/" + org_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return JSON.parse(JSON.stringify(data));
}

export function TopBar() {
  const {
    userSelectedOrg,
    userSelectedOrgLoaded,
    loadUserSelectedOrgData,
    isLoading,
    setIsLoading,
  } = useApp();

  // State
  const [error, setError] = useState("");
  const [OrgData, setOrgData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);

    if (userSelectedOrg?.selectedOrg)
      getOrganization(userSelectedOrg?.selectedOrg)
        .then((data) => {
          if (data) {
            setOrgData(data);
          }
        })
        .catch(() => {
          console.error("Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [userSelectedOrg]);

  return (
    <>
      {!isLoading ? (
        OrgData ? (
          <>
            <div className="flex flex-wrap justify-between w-full px-5 py-6">
              <div>
                <h1 className="text-2xl font-semibold">
                  {OrgData.organization ? OrgData.organization.name : ""}
                </h1>
                <p className="text-sm text-gray-500 ">
                  {OrgData.organization ? OrgData.organization.description : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div>
                  <AvatarsGroup items={OrgData.users ? OrgData.users : []} />
                </div>
                <div>
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-black text-xl">
                      +
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )
      ) : (
        <div className="flex items-center space-x-4 w-full h-[60px]">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      )}
    </>
  );
}
