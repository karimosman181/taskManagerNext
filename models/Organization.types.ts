import { I_User } from "./User.types";

export enum E_OrganizationStatus {
	pending = 'Pending',
	active = 'Active',
	inactive = 'Inactive',
	banned = 'Banned',
}
export type T_OrganizationStatus = keyof typeof E_OrganizationStatus;

export interface I_Organization {
	id: string;
	name: string;
	description: string;
    avatar: string;
	status: T_OrganizationStatus;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
    // users: I_User[];
}

export interface I_OrganizationCreate
	extends Optional<
		I_Organization,
		'id' | 'avatar' |'status' | 'createdAt' | 'updatedAt' | 'deletedAt'
	> {}
