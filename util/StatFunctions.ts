import { DateTime } from "luxon";
import { Score } from "@/context/PlayerDataContext";
import { FilteredScore, LabelValue } from "@/types/Interfaces";

const checkInvalidNum = (number: number | string): string => {
	const numberNumber = number as number;
	if (isNaN(numberNumber) || !isFinite(numberNumber)) return "";
	return number as string;
};

const isDefaultGameMode = (scoreInst: Score): boolean => {
	if (scoreInst.gameModeType === "Preset" && scoreInst.customGameModeName === "" && scoreInst.difficulty !== "None") {
		return true;
	}
	return false;
};

const isCustomGameMode = (scoreInst: Score): boolean => {
	if (scoreInst.gameModeType === "Custom" && scoreInst.customGameModeName !== "" && scoreInst.difficulty === "None") {
		return true;
	}
	return false;
};

// returns an array containing all game modes
export const getGameModes = async (scores: Score[], bCustom: boolean = false): Promise<LabelValue[]> => {
	const gameModesSet = new Set<string>();

	for (const scoreInst of scores) {
		const gameModeName = bCustom ? scoreInst.customGameModeName : scoreInst.baseGameMode;

		if ((bCustom && isCustomGameMode(scoreInst)) || (!bCustom && isDefaultGameMode(scoreInst))) {
			gameModesSet.add(gameModeName);
		}
	}

	const gameModeArray = Array.from(gameModesSet).map((value) => ({ value, label: value }));
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
	const scoreMap = new Map<string, FilteredScore>();

	for (const scoreInst of scores) {
		const bValidCustom =
			bCustom &&
			isCustomGameMode(scoreInst) &&
			scoreInst.customGameModeName === selectedGameMode &&
			scoreInst.songTitle === selectedSong;

		const bValidDefault =
			!bCustom &&
			isDefaultGameMode(scoreInst) &&
			scoreInst.baseGameMode === selectedGameMode &&
			scoreInst.songTitle === selectedSong &&
			scoreInst.difficulty === selectedDifficulty;

		if (bValidCustom || bValidDefault) {
			if (selectedDateRange) {
				const scoreTime = DateTime.fromISO(scoreInst.time);
				if (!(scoreTime >= selectedDateRange[0] && scoreTime <= selectedDateRange[1])) {
					continue; // Skip if outside the date range
				}
			}

			const locAccArr = scoreInst.locationAccuracy
				? Object.values(scoreInst.locationAccuracy).flatMap((accuracyRow, rowIndex) =>
						accuracyRow.accuracy.map((accuracyValue, colIndex) => ({
							x: colIndex,
							y: rowIndex,
							v: accuracyValue,
						}))
					)
				: [];

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
			(bCustom && isCustomGameMode(scoreInst) && scoreInst.customGameModeName === newSelectedGameMode) ||
			(!bCustom && isDefaultGameMode(scoreInst) && scoreInst.baseGameMode === newSelectedGameMode)
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
