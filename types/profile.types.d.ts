export type FilteredScore = {
	score: number;
	highScore: number;
	accuracy: number;
	streak: number;
	difficulty: string;
	completion: number;
	timeOffset: number;
	locationAccuracy: LocationAccuracyHeatMapData[];
};

export type ProfileInfo = {
	displayName: string;
	steamLinked: number;
};
