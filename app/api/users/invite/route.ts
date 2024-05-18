import { User } from "@/models/associations";

import { setUserDataCookie } from "@/lib/server/auth";
import { NextResponse, NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/server/api/errorResponse";
import { InviteUser } from "@/lib/server/user";

export interface I_ApiInviteUserRequest {
  email: string;
}

export interface I_ApiInviteUserResponse extends ApiResponse {}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as I_ApiInviteUserRequest;

  // trim all input values
  const { email } = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, value?.trim()])
  ) as I_ApiInviteUserRequest;
  if (!email) {
    const res: I_ApiInviteUserResponse = {
      success: false,
      message: "A required field is missing",
    };
    return NextResponse.json(res, { status: 400 });
  }

  try {
    const invitedUser = await InviteUser(email);

    if (invitedUser) {
      const res: I_ApiInviteUserResponse = {
        success: true,
        message: "User Invited",
      };
      return NextResponse.json(res, { status: 200 });
    } else {
      const res: I_ApiInviteUserResponse = {
        success: false,
        message: "OOPs! something went wrong !",
      };
      return NextResponse.json(res, { status: 500 });
    }
  } catch (err: any) {
    return apiErrorResponse(err);
  }
}
