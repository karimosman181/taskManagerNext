import { DataTypes, Model, Op } from 'sequelize';
import sequelize from '@/config/sequelize';
import * as log from '@/lib/common/logger';

import { I_Organization,I_OrganizationCreate, } from './Organization.types'; 
import { I_User } from './User.types';


class Organization extends Model<I_Organization, I_OrganizationCreate> implements I_Organization {
	public id!: I_Organization['id'];
	public name!: I_Organization['name'];
	public discription!: I_Organization['discription'];
	public avatar!: I_Organization['avatar'];
	public status!: I_Organization['status'];
	public createdAt!: I_Organization['createdAt'];
	public updatedAt!: I_Organization['updatedAt'];
	public deletedAt!: I_Organization['deletedAt'];
	public users!: I_Organization['users'];

}


export default Organization;