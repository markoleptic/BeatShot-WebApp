export type Accuracy = {
	accuracy: number[];
};

export type Score = {
	accuracy: number;
	avgTimeOffset: number;
	baseGameMode: string;
	completion: number;
	customGameModeName: string;
	difficulty: string;
	gameModeType: string;
	highScore: number;
	locationAccuracy: Accuracy[] | null;
	score: number;
	scoreID: number;
	shotsFired: number;
	songLength: number;
	songTitle: string;
	streak: number;
	targetsHit: number;
	targetsSpawned: number;
	time: string;
	totalPossibleDamage: number;
	totalTimeOffset: number;
	userID: string;
};

export type GameModeTime = {
	gameModeName: string;
	gameModeType: string;
	totalTime: number;
};
