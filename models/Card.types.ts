export interface I_Card {
  id: string;
  listId: string;
  title: string;
  description: string;
  content: string;
  order: number;
  color: string;
  // tags: string[];
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface I_CardCreate
  extends Optional<
    I_Card,
    | "id"
    | "description"
    | "content"
    | "order"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "color"
    | "dueAt"
    | "listId"
    // | "tags"
  > {}

export interface I_CardPublic extends I_Card {}
