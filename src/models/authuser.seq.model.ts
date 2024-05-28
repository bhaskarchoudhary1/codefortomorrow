import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequelize";
export class AuthUser extends Model {
  password: string;
  id: bigint;
  email: string;
  full_name: string;
}
AuthUser.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    full_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "full_name"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "email",
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "password",
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "isLoggedIn",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    }
  },
  { sequelize, paranoid: true, freezeTableName: true, modelName: "users" }
);
