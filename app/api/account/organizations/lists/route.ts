import { NextResponse, NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/server/api/errorResponse";
import { createList, deleteListById, getLists } from "@/lib/server/list";
import { I_ListPublic } from "@/models/List.types";

export interface I_ApiListCreateRequest {
  title: string;
  description: string;
  color: string;
}

export interface I_ApiListCreateResponse extends ApiResponse {}
export interface I_ApiListDeleteResponse extends ApiResponse {}

export interface I_ApiListsResponse extends ApiResponse {
  lists: I_ListPublic[] | null;
}

export async function GET(request: NextRequest) {
  try {
    const data = await getLists();

    const response: I_ApiListsResponse = {
      success: true,
      lists: data,
    };

    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as I_ApiListCreateRequest;

  // trim all input values
  const { title, description, color } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, value?.trim()])
  ) as I_ApiListCreateRequest;
  if (!title || !description || !color) {
    const res: I_ApiListCreateResponse = {
      success: false,
      message: "A required field is missing",
    };
    return NextResponse.json(res, { status: 400 });
  }

  try {
    const list: any = await createList({
      title,
      description,
      color,
    });

    if (list) {
      const res: I_ApiListCreateResponse = {
        success: true,
        message: "list Created",
      };
      return NextResponse.json(res, { status: 200 });
    } else {
      const res: I_ApiListCreateResponse = {
        success: false,
        message: "OOPs! something went wrong !",
      };
      return NextResponse.json(res, { status: 500 });
    }
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const res = await deleteListById(id);

      if (res) {
        const res: I_ApiListCreateResponse = {
          success: true,
          message: "list Created",
        };
        return NextResponse.json(res, { status: 200 });
      } else {
        const res: I_ApiListCreateResponse = {
          success: false,
          message: "OOPs! something went wrong !",
        };
        return NextResponse.json(res, { status: 500 });
      }
    } else {
      const res: I_ApiListCreateResponse = {
        success: false,
        message: "Id is missing",
      };
      return NextResponse.json(res, { status: 400 });
    }
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}
