import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface usersAttributes {
  userID?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmed?: number;
  refreshToken?: string;
  displayName?: string;
}

@Table({
  tableName: "users",
  timestamps: true,
})
export class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {
  @Column({
    field: "userID",
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @Index({
    name: "PRIMARY",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  userID?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  @Index({
    name: "username",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  username?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  @Index({
    name: "email",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  email?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  password?: string;

  @Column({
    allowNull: false,
    type: DataType.TINYINT,
    defaultValue: "0",
  })
  confirmed?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  refreshToken?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  displayName?: string;
}
