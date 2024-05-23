import { Organization, List, Card } from "@/models/associations";
import { cookies } from "next/headers";
import { I_ListCreate, I_ListPublic } from "@/models/List.types";

export async function getLists() {
  try {
    const cookieStore = cookies();

    const cookieSelectedOrgData = cookieStore.get("selectedOrg");
    if (!cookieSelectedOrgData) return null;

    const selectedOrg = JSON.parse(cookieSelectedOrgData.value);

    const lists = await List.findAll({
      where: {
        organizationId: selectedOrg.selectedOrg,
        deletedAt: null,
      },
      include: [
        {
          model: Card,
          as: "ListCards",
          include: [
            {
              all: true,
              nested: true,
            },
          ],
        },
      ],
      order: [
        ["order", "ASC"],
        ["ListCards", "order", "ASC"],
      ],
    });

    return lists as unknown as I_ListPublic[];
  } catch (_) {
    return null;
  }
}

export async function updateListOrder(data: { id: string; order: number }) {
  try {
    return await List.update(
      {
        order: data.order,
      },
      {
        where: { id: data.id },
      }
    );
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
        deletedAt: null,
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

export async function deleteListById(id: string) {
  try {
    const res = await List.update(
      { deletedAt: new Date() },
      { where: { id: id } }
    );
    return res;
  } catch (_) {
    console.log(_);
    return null;
  }
}
