import User from "./User.model";
import Organization from "@/models/Organization.model";
import UserOrganization from "./UserOrganization.model";
import List from "./List.model";
import Card from "./Card.model";

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

List.hasMany(Card, {
  sourceKey: "id",
  foreignKey: "listId",
  as: "ListCards",
});

Card.belongsTo(List);

User.belongsToMany(Card, { through: "User_Cards" });
Card.belongsToMany(User, { through: "User_Cards" });

export { User, Organization, UserOrganization, List, Card };
