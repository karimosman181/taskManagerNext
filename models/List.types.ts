export interface I_List {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  content: Text;
  order: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface I_ListCreate
  extends Optional<
    I_List,
    | "id"
    | "organizationId"
    | "description"
    | "content"
    | "order"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "color"
  > {}
