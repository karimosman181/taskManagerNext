"use client"

import Link from "next/link"
import React from "react";
import { Logo } from "@/components/logo";
import { SidebarNavItem } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Orgdropdown } from "./ui/orgdropdown";
import { Profiledropdown } from "./ui/profiledropdown";

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function SideNav({ items }: DashboardNavProps) {
    const path = usePathname()

    if (!items?.length) {
        return null
    }

    return <>
    <div className="w-full flex flex-wrap justify-center gap-5 flex-col">
    <div className="">
        <Logo />
    </div>
    <div className="w-full">
        <Orgdropdown />
    </div>
    <div className="">
    <h3 className="text-gray-500 leading-8 font-semibold">Main Menu</h3>
    <nav className="grid items-start gap-2 mt-2">
      {items.map((item, index) => {
        const Icon = Icons[ item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
    </div>
    <div className="">
        <h3 className="text-gray-500 leading-8 font-semibold">WorkSpaces</h3>
        <ul className="list-disc list-inside mt-2">
            <li className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">Landing Page Company</li>
            <li className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">page</li>
            <li className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">page 2</li>
            <li className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">page 3</li>
        </ul>
    </div>
    <div className="cursor-pointer">
        <div className="bg-gray-200 rounded-xl flex flex-col flex-wrap justify-center items-center pt-4 pb-4 pl-2 pr-2">
                <div className="bg-gray-300 rounded-full w-[35px] text-3xl text-center">
                    +
                </div>
                <div>
                    add workSpacce
                </div>
        </div>
    </div>
    <Profiledropdown />
    </div>
    </>
}