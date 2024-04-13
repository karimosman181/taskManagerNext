import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type OrganizationUsersItem = {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
  createdAt: string;
  updatedAt: Date;
  deletedAt?: Date;
  UserId: string;
  OrganizationId: string;
  User: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    lastLogin: Date;
    lastSeen: Date;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
