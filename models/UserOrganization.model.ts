import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/config/sequelize';
import { I_UserOrg, I_UserOrgCreate } from './UserOrganization.types';

class UserOrganization extends Model<I_UserOrg, I_UserOrgCreate> implements I_UserOrg {
	public id!: I_UserOrg['id'];
	public userId!: I_UserOrg['userId'];
    public organizationId!: I_UserOrg['organizationId'];
    public role!: I_UserOrg['role'];
    public createdAt!: I_UserOrg['createdAt'];
	public updatedAt!: I_UserOrg['updatedAt'];
	public deletedAt!: I_UserOrg['deletedAt'];
}
