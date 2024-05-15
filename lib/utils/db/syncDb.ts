"use server";

import {
  UserOrganization,
  User,
  Organization,
  List,
  Card,
  UserCard,
} from "@/models/associations";

export async function syncDb() {
  await User.sync({ alter: true });
  await Organization.sync({ alter: true });
  await UserOrganization.sync({ alter: true });
  await List.sync({ alter: true });
  await Card.sync({ alter: true });
  await UserCard.sync({ alter: true });
}

export async function seedUsers() {
  // Drop all users
  await User.destroy({ truncate: true });

  const user1 = await User.create({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "12345",
    avatar: "https://cdn.designly.biz/fake-user/john.jpg",
    role: "admin",
    status: "active",
  });

  const Organization1 = await Organization.create({
    name: "Personal Organization",
    description: "John's Personal Organization",
    avatar: "avatars/org/org1.svg",
  });

  const userOrganization1 = await user1.createUserOrganization({
    role: "admin",
  });

  Organization1.addUserOrganization(userOrganization1);

  const user2 = await User.create({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "12345",
    avatar: "https://cdn.designly.biz/fake-user/jane.jpg",
    role: "customer",
    status: "active",
  });

  const Organization2 = await Organization.create({
    name: "Personal Organization",
    description: "Jane's Personal Organization",
    avatar: "avatars/org/org2.svg",
  });

  const userOrganization2 = await user2.createUserOrganization({
    role: "admin",
  });

  await Organization2.addUserOrganization(userOrganization2);

  const userOrganization3 = await user2.createUserOrganization({
    role: "user",
  });

  await Organization1.addUserOrganization(userOrganization3);

  return [user1, user2];
}
