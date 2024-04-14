import User from "./User.model";
import Organization from "@/models/Organization.model";
import UserOrganization from "./UserOrganization.model";
import List from "./List.model";

// TODO - Add associations here
User.hasMany(UserOrganization, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userOrganizations",
});

Organization.hasMany(UserOrganization, {
  sourceKey: "id",
  foreignKey: "organizationId",
  as: "UserOrganizations",
});

UserOrganization.belongsTo(User);
UserOrganization.belongsTo(Organization);

Organization.hasMany(List, {
  sourceKey: "id",
  foreignKey: "organizationId",
  as: "OrganizationLists",
});

List.belongsTo(Organization);

export { User, Organization, UserOrganization };
