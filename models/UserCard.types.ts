import { I_UserPublic } from "./User.types";

export interface I_UserCard {
  id: string;
  userId: string;
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface I_UserCardCreate
  extends Optional<
    I_UserCard,
    "id" | "userId" | "cardId" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

export interface I_UserCardPublic extends I_UserCard {
  User: I_UserPublic;
}
