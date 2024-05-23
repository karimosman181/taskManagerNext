import { NextResponse, NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/server/api/errorResponse";
import { I_CardPublic } from "@/models/Card.types";
import { createCard, linkUserCard, updateCardOrder } from "@/lib/server/card";
import UserOrganization from "@/models/UserOrganization.model";
import Card from "@/models/Card.model";

export interface I_ApiCardCreateRequest {
  listId: string;
  title: string;
  description: string;
  color: string;
  content?: string;
  users?: UserOrganization[];
}

export interface I_ApiCardOrderUpdateRequest {
  data: { id: string; order: number; listId: string }[];
}

export interface I_ApiCardCreateResponse extends ApiResponse {}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as I_ApiCardCreateRequest;

  // trim all input values
  const { title, description, color, content, listId } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value?.trim()];
      } else {
        return [key, value];
      }
    })
  ) as I_ApiCardCreateRequest;
  if (!title || !description || !color || !listId) {
    const res: I_ApiCardCreateResponse = {
      success: false,
      message: "A required field is missing",
    };
    return NextResponse.json(res, { status: 400 });
  }

  const users = body.users;

  try {
    const card: Card | null = await createCard(listId, {
      title,
      description,
      color,
      content,
    });

    if (card) {
      if (users && users.length > 0) {
        users.map(async (userOrg, index) => {
          const card2 = await linkUserCard(card.id, userOrg);
        });
      }

      const res: I_ApiCardCreateResponse = {
        success: true,
        message: "Card Created",
      };
      return NextResponse.json(res, { status: 200 });
    } else {
      const res: I_ApiCardCreateResponse = {
        success: false,
        message: "OOPs! something went wrong !",
      };
      return NextResponse.json(res, { status: 500 });
    }
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as I_ApiCardOrderUpdateRequest;

  const { data } = body;

  if (!data || data.length === 0) {
    const res: I_ApiCardCreateResponse = {
      success: false,
      message: "A required field is missing",
    };
    return NextResponse.json(res, { status: 400 });
  }

  try {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      await updateCardOrder({
        id: element.id,
        order: element.order,
        listId: element.listId,
      });

      if (index === data.length - 1) {
        const res: I_ApiCardCreateResponse = {
          success: true,
          message: "Cards order updated",
        };
        return NextResponse.json(res, { status: 200 });
      }
    }
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}
