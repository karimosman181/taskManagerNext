import { NextResponse, NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/server/api/errorResponse";
import { I_CardPublic } from "@/models/Card.types";
import { createCard, updateCardOrder } from "@/lib/server/card";

export interface I_ApiCardCreateRequest {
  listId: string;
  title: string;
  description: string;
  color: string;
  content?: Text;
}

export interface I_ApiCardOrderUpdateRequest {
  data: { id: string; order: number; listId: string }[];
}

export interface I_ApiCardCreateResponse extends ApiResponse {}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as I_ApiCardCreateRequest;

  // trim all input values
  const { title, description, color, content, listId } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, value?.trim()])
  ) as I_ApiCardCreateRequest;
  if (!title || !description || !color || !listId) {
    const res: I_ApiCardCreateResponse = {
      success: false,
      message: "A required field is missing",
    };
    return NextResponse.json(res, { status: 400 });
  }

  try {
    const card: any = await createCard(listId, {
      title,
      description,
      color,
      content,
    });

    if (card) {
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
