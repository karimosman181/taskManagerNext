import { UserOrganization, User, Organization } from '@/models/associations';
import { cookies } from 'next/headers';


export function getUserOrganizationList() {
    try {
		const cookieStore = cookies();
		const cookieData = cookieStore.get('userData');
		if (!cookieData) return null;

		const user = JSON.parse(cookieData.value);

        console.log(user?.id);
        
        return UserOrganization.findAll({
            where: {
                userId: user?.id,
            },
            include: [ Organization ]
        });
	} catch (_) {
		return null;
	}
}