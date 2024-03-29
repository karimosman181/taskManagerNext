import { NextResponse, NextRequest } from 'next/server';
import { User } from '@/models/associations';
import { setUserDataCookie, setJWT } from '@/lib/server/auth';
import { apiErrorResponse } from '@/lib/server/api/errorResponse';

export interface I_ApiUserSignupRequest {
    firstName: string;
    lastName: string;
	email: string;
	password: string;
	code?: string;
}

export interface I_ApiUserSignupResponse extends ApiResponse {}

export const dynamic = 'force-dynamic';

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const isDev = process.env.NODE_ENV === 'development';
	const body = (await request.json()) as I_ApiUserSignupRequest;

    	// trim all input values
	const { firstName, lastName, email, password } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiUserSignupRequest;
	if (!firstName || !lastName || !email || !password) {
		const res: I_ApiUserSignupResponse = {
			success: false,
			message: 'Required Field is missing',
		};
		return NextResponse.json(res, { status: 400 });
	}

    try {
        //signup and fetch user from database
        const newUser = await User.signup(firstName, lastName,email,password);

		// Check if user is active
		if (newUser.status !== 'active') throw new Error('User account is not active');

        // create our response object
		const res: I_ApiUserSignupResponse = {
			success: true,
		};
		const response = NextResponse.json(res);

		// Store public user data as a cookie
		const userData = newUser.exportPublic();

		// Set auth cookies
		setUserDataCookie(userData);
		await setJWT(userData);

		return response;
    } catch (err: any) {
		return apiErrorResponse(err);
	}
}