import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/config/sequelize';
import { E_UserOrgRole, I_UserOrg, I_UserOrgCreate } from './UserOrganization.types';
import  User from './User.model';
import  Organization from './Organization.model';


export const USER_ORG_ROLES = Object.keys(E_UserOrgRole);

class UserOrganization extends Model<I_UserOrg, I_UserOrgCreate> implements I_UserOrg {
	public id!: I_UserOrg['id'];
	public userId!: I_UserOrg['userId'];
    public organizationId!: I_UserOrg['organizationId'];
    public role!: I_UserOrg['role'];
    public createdAt!: I_UserOrg['createdAt'];
	public updatedAt!: I_UserOrg['updatedAt'];
	public deletedAt!: I_UserOrg['deletedAt'];
}

// UserOrganization.belongsTo(User, { targetKey: 'id'});
// UserOrganization.belongsTo(Organization, { targetKey: 'id'});

UserOrganization.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		organizationId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		role: {
			type: DataTypes.ENUM(...USER_ORG_ROLES),
			defaultValue: 'user',
			allowNull: false,
			validate: {
				isIn: [USER_ORG_ROLES],
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
	},
	{
		sequelize,
		modelName: 'UserOrganization',
		tableName: 'userOrganization',
		timestamps: true,
		underscored: true,
		paranoid: true,
		hooks: {
			beforeSave: async (UserOrganization: UserOrganization) => {
				
			},
		},
	},
);

export default UserOrganization;