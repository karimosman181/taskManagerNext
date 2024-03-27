import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/config/sequelize';
import * as log from '@/lib/common/logger';

import { I_Organization,I_OrganizationCreate, } from './Organization.types'; 
import { I_User } from './User.types';
import { ORGANIZATION_STATUS, organizationSchemaConstraints } from '@/yup/organiztion.schema';
import User from './User.model';


class Organization extends Model<I_Organization, I_OrganizationCreate> implements I_Organization {
	public id!: I_Organization['id'];
	public name!: I_Organization['name'];
	public description!: I_Organization['description'];
	public avatar!: I_Organization['avatar'];
	public status!: I_Organization['status'];
	public createdAt!: I_Organization['createdAt'];
	public updatedAt!: I_Organization['updatedAt'];
	public deletedAt!: I_Organization['deletedAt'];
	// public users!: I_Organization['users'];

}


Organization.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				min: organizationSchemaConstraints.name.minLength,
				max: organizationSchemaConstraints.name.maxLength,
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				min: organizationSchemaConstraints.description.minLength,
				max: organizationSchemaConstraints.description.maxLength,
			},
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM(...ORGANIZATION_STATUS),
			defaultValue: 'pending',
			allowNull: false,
			validate: {
				isIn: [ORGANIZATION_STATUS],
			},
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		// users: {
		// 	,
		// }
	},
	{
		sequelize,
		modelName: 'Organization',
		tableName: 'organizations',
		timestamps: true,
		underscored: true,
		paranoid: true,
		hooks: {
			beforeSave: async (Organization: Organization) => {
				
			},
		},
	},
);

export default Organization;