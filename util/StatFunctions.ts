import { DateTime } from "luxon";
import { Score } from "@/context/PlayerDataContext";

export const checkInvalidNum = (number: number | string): string => {
	const numberNumber = number as number;
	if (isNaN(numberNumber) || !isFinite(numberNumber)) return "";
	return number as string;
};

export const isDefaultGameMode = (scoreInst: Score): boolean => {
	if (scoreInst.gameModeType === "Preset" && scoreInst.customGameModeName === "") {
		return true;
	}
	return false;
};

export const isCustomGameMode = (scoreInst: Score): boolean => {
	if (scoreInst.gameModeType === "Custom" && scoreInst.customGameModeName !== "") {
		return true;
	}
	return false;
};

export interface LabelValue {
	value: string;
	label: string;
}

export interface LocationAccuracyHeatMapData {
	x: number;
	y: number;
	v: number;
}

export interface FilteredScore {
	score: number;
	highScore: number;
	accuracy: number;
	streak: number;
	difficulty: string;
	completion: number;
	timeOffset: number;
	locationAccuracy: LocationAccuracyHeatMapData[];
}

// returns an array containing all game modes
export const getGameModes = async (scores: Score[], bCustom: boolean = false): Promise<LabelValue[]> => {
	let gameModeArray: LabelValue[] = [];
	for (const scoreInst of scores) {
		if (bCustom) {
			if (isCustomGameMode(scoreInst)) {
				if (!gameModeArray.some((e) => e.label === scoreInst.customGameModeName)) {
					gameModeArray.push({
						value: scoreInst.customGameModeName,
						label: scoreInst.customGameModeName,
					});
				}
			}
		} else {
			if (isDefaultGameMode(scoreInst)) {
				if (!gameModeArray.some((e) => e.label === scoreInst.baseGameMode)) {
					gameModeArray.push({
						value: scoreInst.baseGameMode,
						label: scoreInst.baseGameMode,
					});
				}
			}
		}
	}
	gameModeArray.sort((a, b) => a.value.localeCompare(b.value));
	return gameModeArray;
};

// returns an object containing {dates, scores}
export const getScores = async (
	scores: Score[],
	bCustom: boolean,
	selectedGameMode: string,
	selectedSong: string,
	selectedDifficulty: string,
	selectedDateRange: [DateTime, DateTime] | null = null
) => {
	let scoreMap = new Map<string, FilteredScore>();
	for (const scoreInst of scores) {
		let bContinue = true;
		if (bCustom && isCustomGameMode(scoreInst)) {
			if (scoreInst.customGameModeName === selectedGameMode && scoreInst.songTitle === selectedSong) {
				if (!selectedDateRange) bContinue = false;
				else {
					bContinue =
						DateTime.fromISO(scoreInst.time) < selectedDateRange[0] ||
						DateTime.fromISO(scoreInst.time) > selectedDateRange[1];
				}
			}
		} else if (!bCustom && isDefaultGameMode(scoreInst)) {
			if (
				scoreInst.baseGameMode === selectedGameMode &&
				scoreInst.songTitle === selectedSong &&
				scoreInst.difficulty === selectedDifficulty
			) {
				if (!selectedDateRange) bContinue = false;
				else {
					bContinue =
						DateTime.fromISO(scoreInst.time) < selectedDateRange[0] ||
						DateTime.fromISO(scoreInst.time) > selectedDateRange[1];
				}
			}
		}
		if (bContinue) {
			continue;
		}
		let locAccArr = [];
		if (scoreInst.locationAccuracy !== null) {
			const accuracyArr = Object.values(scoreInst.locationAccuracy);
			for (const accuracyRow of accuracyArr) {
				for (const [col, accuracyValue] of accuracyRow.accuracy.entries()) {
					locAccArr.push({
						x: col,
						y: accuracyArr.indexOf(accuracyRow),
						v: accuracyValue,
					});
				}
			}
		}
		scoreMap.set(scoreInst.time, {
			score: scoreInst.score,
			highScore: scoreInst.highScore,
			accuracy: scoreInst.accuracy,
			streak: scoreInst.streak,
			difficulty: scoreInst.difficulty,
			completion: scoreInst.completion,
			timeOffset: scoreInst.avgTimeOffset,
			locationAccuracy: locAccArr,
		});
	}
	const sortedScoreMap = new Map([...scoreMap].sort());
	return {
		keys: [...sortedScoreMap.keys()],
		values: [...sortedScoreMap.values()],
	};
};

export const getMatchingSongOptions = async (
	scores: Score[],
	newSelectedGameMode: string,
	bCustom: boolean
): Promise<LabelValue[]> => {
	let matchingSongTitles: LabelValue[] = [];
	for (const scoreInst of scores) {
		if (
			(bCustom && scoreInst.customGameModeName === newSelectedGameMode) ||
			(!bCustom && scoreInst.baseGameMode === newSelectedGameMode)
		) {
			if (matchingSongTitles.length === 0) {
				matchingSongTitles.push({
					value: scoreInst.songTitle,
					label: scoreInst.songTitle,
				});
			} else if (!matchingSongTitles.some((e) => e.value === scoreInst.songTitle)) {
				matchingSongTitles.push({
					value: scoreInst.songTitle,
					label: scoreInst.songTitle,
				});
			}
		}
	}
	return matchingSongTitles.sort((a, b) => a.value.localeCompare(b.value)) || [];
};

export const getMatchingDifficultyOptions = async (
	scores: Score[],
	selectedGameMode: string,
	newSelectedSong: string
): Promise<LabelValue[]> => {
	let matchingDifficulties: LabelValue[] = [];
	for (const scoreInst of scores) {
		if (scoreInst.songTitle === newSelectedSong && scoreInst.baseGameMode === selectedGameMode) {
			if (matchingDifficulties.length === 0) {
				matchingDifficulties.push({
					value: scoreInst.difficulty,
					label: scoreInst.difficulty,
				});
			} else if (!matchingDifficulties.some((e) => e.value === scoreInst.difficulty)) {
				matchingDifficulties.push({
					value: scoreInst.difficulty,
					label: scoreInst.difficulty,
				});
			}
		}
	}
	return matchingDifficulties.sort((a, b) => a.value.localeCompare(b.value)) || [];
};

export const findMostRecentGameModeOption = async (
	scores: Score[],
	gameModeOptions: LabelValue[],
	bCustom: boolean
): Promise<string | null> => {
	let mostRecent: Score | null = null;
	for (const scoreInst of scores) {
		if (
			(!bCustom &&
				isDefaultGameMode(scoreInst) &&
				gameModeOptions.some((e) => e.value === scoreInst.baseGameMode)) ||
			(bCustom &&
				isCustomGameMode(scoreInst) &&
				gameModeOptions.some((e) => e.value === scoreInst.customGameModeName))
		) {
			if (mostRecent === null) {
				mostRecent = scoreInst;
			}
			if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(scoreInst.time)) {
				mostRecent = scoreInst;
			}
		}
	}
	if (!mostRecent) return null;
	if (bCustom) return mostRecent.customGameModeName;
	return mostRecent.baseGameMode;
};

export const findMostRecentSongOption = async (
	scores: Score[],
	songOptions: LabelValue[],
	bCustom: boolean
): Promise<string | null> => {
	let mostRecent: Score | null = null;
	for (const scoreInst of scores) {
		if (
			(!bCustom && isDefaultGameMode(scoreInst) && songOptions.some((e) => e.value === scoreInst.songTitle)) ||
			(bCustom && isCustomGameMode(scoreInst) && songOptions.some((e) => e.value === scoreInst.songTitle))
		) {
			if (mostRecent === null) {
				mostRecent = scoreInst;
			} else if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(scoreInst.time)) {
				mostRecent = scoreInst;
			}
		}
	}
	if (!mostRecent) return null;
	return mostRecent.songTitle;
};

export const findMostRecentDifficultyOption = async (
	scores: Score[],
	difficultyOptions: LabelValue[]
): Promise<string | null> => {
	let mostRecent: Score | null = null;
	for (const scoreInst of scores) {
		if (
			scoreInst.gameModeType === "Preset" &&
			scoreInst.customGameModeName === "" &&
			difficultyOptions.some((e) => e.value === scoreInst.difficulty)
		) {
			if (mostRecent === null) {
				mostRecent = scoreInst;
			} else if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(scoreInst.time)) {
				mostRecent = scoreInst;
			}
		}
	}
	if (!mostRecent) return null;
	return mostRecent.difficulty;
};

export const updateBests = async (
	scores: FilteredScore[],
	setScore: React.Dispatch<React.SetStateAction<string>>,
	setAccuracy: React.Dispatch<React.SetStateAction<string>>,
	setCompletion: React.Dispatch<React.SetStateAction<string>>,
	setTimeOffset: React.Dispatch<React.SetStateAction<string>>,
	setStreak: React.Dispatch<React.SetStateAction<string>>
) => {
	setScore(checkInvalidNum(Math.round((Math.max(...scores.map((value) => value.highScore)) * 10) / 10)));
	setAccuracy(checkInvalidNum(Math.round(Math.max(...scores.map((value) => value.accuracy)) * 1000) / 10) + "%");
	setCompletion(checkInvalidNum(Math.round(Math.max(...scores.map((value) => value.completion)) * 1000) / 10) + "%");
	setTimeOffset(checkInvalidNum(Math.round(Math.min(...scores.map((value) => value.timeOffset)) * 1000)) + " ms");
	setStreak(checkInvalidNum(Math.max(...scores.map((value) => value.streak))));
};

export const updateAvgs = async (
	scores: FilteredScore[],
	setScore: React.Dispatch<React.SetStateAction<string>>,
	setAccuracy: React.Dispatch<React.SetStateAction<string>>,
	setCompletion: React.Dispatch<React.SetStateAction<string>>,
	setTimeOffset: React.Dispatch<React.SetStateAction<string>>,
	setStreak: React.Dispatch<React.SetStateAction<string>>
) => {
	setScore(
		checkInvalidNum(Math.round(scores.map((value) => value.score).reduce((p, c, i, a) => p + c / a.length, 0)))
	);
	setAccuracy(
		checkInvalidNum(
			Math.round(scores.map((value) => value.accuracy).reduce((p, c, i, a) => p + c / a.length, 0) * 1000) / 10
		) + "%"
	);
	setCompletion(
		checkInvalidNum(
			Math.round(scores.map((value) => value.completion).reduce((p, c, i, a) => p + c / a.length, 0) * 1000) / 10
		) + "%"
	);
	setTimeOffset(
		checkInvalidNum(
			Math.round(scores.map((value) => value.timeOffset).reduce((p, c, i, a) => p + c / a.length, 0) * 1000)
		) + " ms"
	);
	setStreak(
		checkInvalidNum(Math.round(scores.map((value) => value.streak).reduce((p, c, i, a) => p + c / a.length, 0)))
	);
};
