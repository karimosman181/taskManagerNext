import { User } from '@/models/associations';
import { NextRequest } from 'next/server';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { getUserOrganizationList } from '@/lib/server/organization';


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