import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface usersAttributes {
	userID: string;
	username?: string;
	displayName?: string;
	email?: string;
	password?: string;
	confirmed: number;
	refreshToken?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

@Table({
	tableName: "users",
	timestamps: false,
})
export class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {
	@Column({
		primaryKey: true,
		type: DataType.BIGINT,
	})
	@Index({
		name: "PRIMARY",
		using: "BTREE",
		order: "ASC",
		unique: true,
	})
	@Index({
		name: "userID",
		using: "BTREE",
		order: "ASC",
		unique: true,
	})
	userID!: string;

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
		type: DataType.STRING(36),
	})
	displayName?: string;

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
		type: DataType.TINYINT,
		defaultValue: "0",
	})
	confirmed!: number;

	@Column({
		allowNull: true,
		type: DataType.STRING(255),
	})
	refreshToken?: string;

	@Column({
		allowNull: true,
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	createdAt?: Date;

	@Column({
		allowNull: true,
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	updatedAt?: Date;
}
