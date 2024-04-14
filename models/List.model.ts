import { DataTypes, Model, Op } from "sequelize";
import sequelize from "@/config/sequelize";

import { I_List, I_ListCreate } from "./List.types";
import { listSchemaConstraints } from "@/yup/list.schema";

import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";

class List extends Model<I_List, I_ListCreate> implements I_List {
  public id!: I_List["id"];
  public organizationId!: I_List["organizationId"];
  public title!: I_List["title"];
  public description!: I_List["description"];
  public content!: I_List["content"];
  public order!: I_List["order"];
  public createdAt!: I_List["createdAt"];
  public updatedAt!: I_List["updatedAt"];
  public deletedAt!: I_List["deletedAt"];
}

List.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: listSchemaConstraints.title.minLength,
        max: listSchemaConstraints.title.maxLength,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.NUMBER,
      allowNull: true,
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
    modelName: "List",
    tableName: "lists",
    timestamps: true,
    underscored: true,
    paranoid: true,
    hooks: {
      beforeSave: async (List: List) => {},
    },
  }
);

export default List;
