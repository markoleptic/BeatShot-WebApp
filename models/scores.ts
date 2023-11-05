import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface scoresAttributes {
    userID: string;
    scoreID?: number;
    time: Date;
    gameModeType?: string;
    baseGameMode?: string;
    customGameModeName?: string;
    difficulty?: string;
    songTitle?: string;
    songLength?: number;
    score?: number;
    highScore?: number;
    accuracy?: number;
    completion?: number;
    shotsFired?: number;
    targetsHit?: number;
    targetsSpawned?: number;
    totalPossibleDamage?: number;
    totalTimeOffset?: number;
    avgTimeOffset?: number;
    streak?: number;
    locationAccuracy?: object;
}

@Table({
	tableName: "scores",
	timestamps: false 
})
export class scores extends Model<scoresAttributes, scoresAttributes> implements scoresAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.BIGINT 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    @Index({
    	name: "unique_user_time",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	userID!: string;

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    @Index({
    	name: "scoreID",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	scoreID?: number;

    @Column({
    	type: DataType.DATE(3) 
    })
    @Index({
    	name: "idx_time",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    @Index({
    	name: "unique_user_time",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	time!: Date;

    @Column({
    	type: DataType.STRING(255),
    	defaultValue: "Custom" 
    })
    	gameModeType?: string;

    @Column({
    	type: DataType.STRING(255),
    	defaultValue: "Custom" 
    })
    	baseGameMode?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	customGameModeName?: string;

    @Column({
    	type: DataType.STRING(255),
    	defaultValue: "None" 
    })
    	difficulty?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	songTitle?: string;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	songLength?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	score?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	highScore?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	accuracy?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	completion?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	shotsFired?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	targetsHit?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	targetsSpawned?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	totalPossibleDamage?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	totalTimeOffset?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT(12) 
    })
    	avgTimeOffset?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	streak?: number;

    @Column({
    	allowNull: true,
    	type: DataType.JSON 
    })
    	locationAccuracy?: object;

}