export enum E_UserOrgRole {
	admin = 'Administrator',
	user = 'User',
}

export type T_UserOrgRole = keyof typeof E_UserOrgRole;

export interface I_UserOrg {
	id: string;
    userId: string;
    organizationId: string;
    role: T_UserOrgRole;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}


export interface I_UserOrgCreate
	extends Optional<
		I_UserOrg,
		'id' | 'userId' | 'organizationId' |'createdAt' | 'updatedAt' | 'deletedAt'
	> {}
