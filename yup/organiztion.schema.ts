import * as yup from 'yup';
import yp from 'yup-password';

import { E_OrganizationStatus } from '@/models/Organization.types';

export const ORGANIZATION_STATUS = Object.keys(E_OrganizationStatus);

interface OrganizationSchemaConstraints {
	name: {
		required: string;
		minLength: number;
		maxLength: number;
	};
	description: {
		required: string;
		minLength: number;
		maxLength: number;
	};
	status: {
		required: string;
		isIn: string[];
	};
}

export const organizationSchemaConstraints: OrganizationSchemaConstraints = {
	name: {
		required: 'Name is required',
		minLength: 1,
		maxLength: 20,
	},
	description: {
		required: 'Description is required',
		minLength: 1,
		maxLength: 256,
	},
	status: {
		required: 'Status is required',
		isIn: ORGANIZATION_STATUS,
	},
};

export const userSchema = yup.object().shape({
	name: yup
		.string()
		.label('name')
		.required(organizationSchemaConstraints.name.required)
		.min(organizationSchemaConstraints.name.minLength)
		.max(organizationSchemaConstraints.name.maxLength),
	description: yup
		.string()
		.label('description')
		.required(organizationSchemaConstraints.description.required)
		.min(organizationSchemaConstraints.description.minLength)
		.max(organizationSchemaConstraints.description.maxLength),
});