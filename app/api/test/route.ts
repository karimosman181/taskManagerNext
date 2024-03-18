import { NextRequest } from 'next/server';
import { setUserDataCookie, logout } from '../../../lib/server/auth';
import { apiErrorResponse } from '../../../lib/server/api/errorResponse';
import sequelize from '../../../config/sequelize';

export async function GET(request: NextRequest) {
	try {
        try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
return new Response(JSON.stringify({test: "test"}), {
			headers: {
				'content-type': 'application/json',
			},
		});

    }catch (err: any) {
		return apiErrorResponse(err);
	}
}