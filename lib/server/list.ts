import {
  UserOrganization,
  User,
  Organization,
  List,
} from "@/models/associations";
import { cookies } from "next/headers";
import { I_ListCreate } from "@/models/List.types";

export function getLists() {
  try {
    const cookieStore = cookies();

    const cookieSelectedOrgData = cookieStore.get("selectedOrg");
    if (!cookieSelectedOrgData) return null;

    const selectedOrg = JSON.parse(cookieSelectedOrgData.value);

    return List.findAll({
      where: {
        organizationId: selectedOrg.selectedOrg,
      },
      order: [["order", "ASC"]],
    });
  } catch (_) {
    return null;
  }
}

export async function createList(data: I_ListCreate) {
  try {
    const cookieStore = cookies();

    const cookieSelectedOrgData = cookieStore.get("selectedOrg");
    if (!cookieSelectedOrgData) return null;

    const selectedOrg = JSON.parse(cookieSelectedOrgData.value);

    const organization = await Organization.findByPk(selectedOrg.selectedOrg);

    if (!organization) {
      throw new Error("Organization not found");
    }

    const lastListOrder = await List.findOne({
      order: [["order", "DESC"]],
      where: {
        organizationId: organization.id,
      },
      attributes: ["order"],
    });

    let order = 1;

    if (lastListOrder) {
      order = lastListOrder.order + 1;
    }

    const newList = await List.create({
      title: data.title,
      description: data.description,
      order: order,
      color: data.color,
      organizationId: organization.id,
    });

    return newList;
  } catch (_) {
    console.log(_);
    return null;
  }
}
