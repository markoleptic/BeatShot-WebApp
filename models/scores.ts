import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface scoresAttributes {
  scoreID?: string;
  baseGameMode?: string;
  customGameModeName?: string;
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
  time?: Date;
  streak?: number;
  difficulty?: string;
  userID?: string;
  locationAccuracy?: object;
  gameModeType?: string;
}

@Table({
  tableName: "scores",
  timestamps: true,
})
export class scores extends Model<scoresAttributes, scoresAttributes> implements scoresAttributes {
  @Column({
    field: "scoreID",
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
  scoreID!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  baseGameMode?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  customGameModeName?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  songTitle?: string;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  songLength?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  score?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  highScore?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  accuracy?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  completion?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  shotsFired?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  targetsHit?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  targetsSpawned?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  totalPossibleDamage?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  totalTimeOffset?: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT(12),
  })
  avgTimeOffset?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(3),
  })
  time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  streak?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  difficulty?: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt!: Date;

  @Column({
    field: "userID",
    allowNull: true,
    type: DataType.CHAR(36),
  })
  @Index({
    name: "userID",
    using: "BTREE",
    order: "ASC",
    unique: false,
  })
  userID?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
  })
  locationAccuracy?: object;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  gameModeType?: string;
}
