import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface sequelizemetaAttributes {
    name: string;
}

@Table({
	tableName: "sequelizemeta",
	timestamps: false 
})
export class sequelizemeta extends Model<sequelizemetaAttributes, sequelizemetaAttributes> implements sequelizemetaAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(255) 
    })
    @Index({
    	name: "name",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	name!: string;

}