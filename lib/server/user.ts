import {
  UserOrganization,
  User,
  Organization,
  List,
  Card,
} from "@/models/associations";
import { cookies } from "next/headers";

export async function InviteUser(email: string) {
  try {
    const cookieStore = cookies();

    const cookieSelectedOrgData = cookieStore.get("selectedOrg");
    if (!cookieSelectedOrgData) return null;

    const selectedOrg = JSON.parse(cookieSelectedOrgData.value);

    const userDb = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userDb) {
      throw new Error("User not found");
    }

    const organization = await Organization.findByPk(selectedOrg.selectedOrg);

    if (!organization) {
      throw new Error("Organization not found");
    }

    const userOrganizationDb = await UserOrganization.findOne({
      where: {
        userId: userDb.id,
        organizationId: organization.id,
      },
    });

    if (!userOrganizationDb) {
      const userOrganization = await userDb?.createUserOrganization({
        role: "user",
      });

      await organization?.addUserOrganization(userOrganization);

      return userDb;
    } else {
      throw new Error("User already exists in the organization");
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}
