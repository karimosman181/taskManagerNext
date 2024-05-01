import {
  UserOrganization,
  User,
  Organization,
  List,
  Card,
} from "@/models/associations";
import { cookies } from "next/headers";
import { I_CardCreate } from "@/models/Card.types";

export async function createCard(ListId: string, data: I_CardCreate) {
  try {
    const cookieStore = cookies();

    const cookieSelectedOrgData = cookieStore.get("selectedOrg");
    if (!cookieSelectedOrgData) return null;

    const selectedOrg = JSON.parse(cookieSelectedOrgData.value);

    const organization = await Organization.findByPk(selectedOrg.selectedOrg);

    if (!organization) {
      throw new Error("Organization not found");
    }

    const list = await List.findByPk(ListId);

    if (!list) {
      throw new Error("List not found");
    }

    const lastCardOrder = await Card.findOne({
      order: [["order", "DESC"]],
      where: {
        listId: data.listId,
        deletedAt: null,
      },
      attributes: ["order"],
    });

    let order = 1;

    if (lastCardOrder) {
      order = lastCardOrder.order + 1;
    }

    const newCard = await Card.create({
      title: data.title,
      description: data.description,
      order: order,
      color: data.color,
      content: data.content,
      listId: data.listId,
    });

    await list?.addCard(newCard);

    return newCard;
  } catch (_) {
    console.log(_);
    return null;
  }
}