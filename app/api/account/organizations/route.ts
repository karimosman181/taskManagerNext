import { User } from '@/models/associations';
import { NextResponse, NextRequest } from 'next/server';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { createUserOrganization, getUserOrganizationList } from '@/lib/server/organization';

export interface I_ApiOrganizationCreateRequest {
	name: string;
	description: string;
	avatar: string;
}

export interface I_ApiOrganizationCreateResponse extends ApiResponse {}

export async function GET(request: NextRequest) {
    try {
     
    const data = await getUserOrganizationList();

     return new Response(JSON.stringify(data), {
		    headers: {
			    'Content-Type': 'application/json',
		    },
    	});

    }catch (err: any) {
		return apiErrorResponse(err);
	}
}

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const body = (await request.json()) as I_ApiOrganizationCreateRequest;

	// trim all input values
	const { name, description, avatar } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiOrganizationCreateRequest;
	if (!name || !description || !avatar) {
		const res: I_ApiOrganizationCreateResponse = {
			success: false,
			message: 'A required field is missing',
		};
		return NextResponse.json(res, { status: 400 });
	}

    try {
		const organization = await createUserOrganization({ name, description, avatar });

		if(organization) {
			const res: I_ApiOrganizationCreateResponse = {
			success: true,
			message: 'Organization Created',
		};
		return NextResponse.json(res, { status: 200 });
		}else{
			const res: I_ApiOrganizationCreateResponse = {
			success: false,
			message: 'OOPs! something went wrong !',
		};
		return NextResponse.json(res, { status: 500 });
		}


    }catch (err: any) {
		return apiErrorResponse(err);
	}
}