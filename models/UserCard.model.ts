import { DataTypes, Model, Op } from "sequelize";
import sequelize from "@/config/sequelize";
import { I_UserCardCreate, I_UserCard } from "./UserCard.types";

class UserCard
  extends Model<I_UserCard, I_UserCardCreate>
  implements I_UserCard
{
  public id!: I_UserCard["id"];
  public userId!: I_UserCard["userId"];
  public cardId!: I_UserCard["cardId"];
  public createdAt!: I_UserCard["createdAt"];
  public updatedAt!: I_UserCard["updatedAt"];
  public deletedAt!: I_UserCard["deletedAt"];
}

UserCard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.STRING,
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
    modelName: "UserCard",
    tableName: "userCard",
    timestamps: true,
    underscored: true,
    paranoid: true,
    hooks: {
      beforeSave: async (UserCard: UserCard) => {},
    },
  }
);

export default UserCard;
