import { NextResponse, NextRequest } from 'next/server';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';
import { SelectUserOrganization } from '@/lib/server/organization';


export interface I_ApiOrganizationSelectRequest {
	selectedOrg: string; 
    selectedOrgRole: string;
}

export interface I_ApiOrganizationSelectResponse extends ApiResponse {}


// Create a POST endpoint
export async function POST(request: NextRequest) {
	const body = (await request.json()) as I_ApiOrganizationSelectRequest;

	// trim all input values
	const { selectedOrg, selectedOrgRole } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiOrganizationSelectRequest;
	if (!selectedOrg || !selectedOrgRole) {
		const res: I_ApiOrganizationSelectResponse = {
			success: false,
			message: 'A required field is missing',
		};
		return NextResponse.json(res, { status: 400 });
	}

    try {
        const res = await SelectUserOrganization(selectedOrg, selectedOrgRole);

        
		if(res) {
			const res: I_ApiOrganizationSelectResponse = {
			success: true,
			message: 'Organization Selected',
		};
		return NextResponse.json(res, { status: 200 });
		}else{
			const res: I_ApiOrganizationSelectResponse = {
			success: false,
			message: 'OOPs! something went wrong !',
		};
		return NextResponse.json(res, { status: 500 });
		}
        
    }catch (err: any) {
		return apiErrorResponse(err);
	}
}