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
