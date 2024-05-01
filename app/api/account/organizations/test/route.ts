import { NextResponse, NextRequest } from 'next/server';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { test } from '@/lib/server/organization';

export async function GET(request: NextRequest) {
    try {
       
        const data = await test();

        return new Response(JSON.stringify(data), {
		        headers: {
			        'Content-Type': 'application/json',
		        },
    	    });
    }catch (err: any) {
		return apiErrorResponse(err);
	}
}

