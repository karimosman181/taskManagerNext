import { DataTypes, Model, Op } from "sequelize";
import sequelize from "@/config/sequelize";

import { I_Card, I_CardCreate } from "./Card.types";
import { cardSchemaConstraints } from "@/yup/card.schema";

import User from "./User.model";

import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";

class Card extends Model<I_Card, I_CardCreate> implements I_Card {
  public id!: I_Card["id"];
  public listId!: I_Card["listId"];
  public title!: I_Card["title"];
  public description!: I_Card["description"];
  public content!: I_Card["content"];
  public order!: I_Card["order"];
  public color!: I_Card["color"];
  public tags!: I_Card["tags"];
  public dueAt!: I_Card["dueAt"];
  public userIds!: I_Card["userIds"];
  public createdAt!: I_Card["createdAt"];
  public updatedAt!: I_Card["updatedAt"];
  public deletedAt!: I_Card["deletedAt"];

  public getUser!: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  public hasUser!: HasManyHasAssociationMixin<User, User["id"]>;
  public countUsers!: HasManyCountAssociationsMixin;
  public readonly users?: User[];

  public static associations: {
    User: Association<Card, User>;
  };
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: cardSchemaConstraints.title.minLength,
        max: cardSchemaConstraints.title.maxLength,
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
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY,
      allowNull: true,
    },
    userIds: {
      type: DataTypes.ARRAY,
      allowNull: true,
    },
    dueAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
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
    modelName: "Card",
    tableName: "cards",
    timestamps: true,
    underscored: true,
    paranoid: true,
    hooks: {
      beforeSave: async (Card: Card) => {},
    },
  }
);

export default Card;
