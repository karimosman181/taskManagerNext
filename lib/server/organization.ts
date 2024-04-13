import { UserOrganization, User, Organization } from "@/models/associations";
import { cookies } from "next/headers";
import { I_OrganizationCreate } from "@/models/Organization.types";
import { setJWT, setUserSelectedOrgCookie } from "./auth";

export function getUserOrganizationList() {
  try {
    const cookieStore = cookies();
    const cookieData = cookieStore.get("userData");
    if (!cookieData) return null;

    const user = JSON.parse(cookieData.value);

    return UserOrganization.findAll({
      where: {
        userId: user?.id,
      },
      include: [Organization],
    });
  } catch (_) {
    return null;
  }
}

export async function getOrganizationUsersById(org_id: string) {
  try {
    const organization = await Organization.findByPk(org_id);

    return {
      organization,
      users: await UserOrganization.findAll({
        where: {
          organizationId: org_id,
        },
        include: [User],
      }),
    };
  } catch (_) {
    return null;
  }
}

export async function createUserOrganization(data: I_OrganizationCreate) {
  try {
    const cookieStore = cookies();
    const cookieData = cookieStore.get("userData");
    if (!cookieData) return null;

    const user = JSON.parse(cookieData.value);

    const userDb = await User.findByPk(user.id);

    if (!userDb) {
      throw new Error("User not found");
    }

    const userOrganization = await userDb?.createUserOrganization({
      role: "admin",
    });

    const newOrganization = await Organization.create({
      name: data.name,
      description: data.description,
      avatar: data.avatar,
    });

    return await newOrganization.addUserOrganization(userOrganization);
  } catch (_) {
    return null;
  }
}

export async function SelectUserOrganization(
  selectedOrg: string,
  selectedOrgRole: string
) {
  try {
    const cookieStore = cookies();
    const cookieData = cookieStore.get("userData");
    if (!cookieData) return null;

    const user = JSON.parse(cookieData.value);

    await setJWT(user, selectedOrg, selectedOrgRole);

    setUserSelectedOrgCookie(selectedOrg, selectedOrgRole);

    return true;
  } catch (_) {
    return null;
  }
}
