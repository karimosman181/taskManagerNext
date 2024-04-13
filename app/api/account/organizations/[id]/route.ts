import { NextResponse, NextRequest } from 'next/server';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { getOrganizationUsersById } from '@/lib/server/organization';

export async function GET(request: NextRequest,{params}:{params:{ id: string}}) {
    try {
        const id = params.id;

        const data = await getOrganizationUsersById(id);

        return new Response(JSON.stringify(data), {
		        headers: {
			        'Content-Type': 'application/json',
		        },
    	    });
    }catch (err: any) {
		return apiErrorResponse(err);
	}
}

