import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "My tasks",
      href: "/dashboard/tasks",
      icon: "tasks",
    },
     {
      title: "Members",
      href: "/dashboard/members",
      icon: "groups",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}