import { DateTime } from "luxon";

export const checkInvalidNum = (number) => {
	return isNaN(number) || !isFinite(number) || number === "" ? "0" : number;
};

export const isDefaultGameMode = (gameModeData) => {
	if (gameModeData.gameModeType === "Preset" && gameModeData.customGameModeName === "") {
		return true;
	}
	return false;
};

export const isCustomGameMode = (gameModeData) => {
	if (gameModeData.gameModeType === "Custom" && gameModeData.customGameModeName !== "") {
		return true;
	}
	return false;
};

// returns an array containing all game modes
export const getGameModes = async (data, bCustom = false) => {
	let gameModeArray = [];
	for (let object in data) {
		if (bCustom) {
			if (isCustomGameMode(data[object])) {
				if (!gameModeArray.some((e) => e.label === data[object].customGameModeName)) {
					gameModeArray.push({
						value: data[object].customGameModeName,
						label: data[object].customGameModeName,
					});
				}
			}
		} else {
			if (isDefaultGameMode(data[object])) {
				if (!gameModeArray.some((e) => e.label === data[object].baseGameMode)) {
					gameModeArray.push({
						value: data[object].baseGameMode,
						label: data[object].baseGameMode,
					});
				}
			}
		}
	}
	gameModeArray.sort((a, b) => a.value.localeCompare(b.value));
	return gameModeArray;
};

// returns an object containing {dates, scores}
export const getScores = async (data, bCustom = false, selectedGameMode, selectedSong, selectedDifficulty, selectedDateRange = null) => {
	let scoreMap = new Map();
	for (let scoreObject in data) {
		let bContinue = true;
		if (bCustom && isCustomGameMode(data[scoreObject])) {
			if (data[scoreObject].customGameModeName === selectedGameMode && data[scoreObject].songTitle === selectedSong) {
				bContinue = false;
			}
		} else if (!bCustom && isDefaultGameMode(data[scoreObject])) {
			if (
				data[scoreObject].baseGameMode === selectedGameMode &&
				data[scoreObject].songTitle === selectedSong &&
				data[scoreObject].difficulty === selectedDifficulty
			) {
				if (!selectedDateRange)
					bContinue = false;
				else {
					bContinue = DateTime.fromISO(data[scoreObject].time) < selectedDateRange[0] || DateTime.fromISO(data[scoreObject].time) > selectedDateRange[1] 
				}
			}
		}
		if (bContinue) {
			continue;
		}
		let locAccArr = [];
		if (data[scoreObject].locationAccuracy !== null) {
			let accuracyArr = Object.values(data[scoreObject].locationAccuracy);
			for (let row in accuracyArr) {
				for (let col in accuracyArr[row].accuracy) {
					locAccArr.push({
						x: col,
						y: row,
						v: accuracyArr[row].accuracy[col],
					});
				}
			}
		}
		scoreMap.set(data[scoreObject].time, {
			score: data[scoreObject].score,
			highScore: data[scoreObject].highScore,
			accuracy: data[scoreObject].accuracy,
			streak: data[scoreObject].streak,
			difficulty: data[scoreObject].difficulty,
			completion: data[scoreObject].completion,
			timeOffset: data[scoreObject].avgTimeOffset,
			locationAccuracy: locAccArr,
		});
	}
	const sortedScoreMap = new Map([...scoreMap].sort());
	return { keys: [...sortedScoreMap.keys()], values: [...sortedScoreMap.values()] };
};

export const getMatchingSongOptions = async (data, newSelectedGameMode, bCustom = false) => {
	let matchingSongTitles = [];
	for (let scoreObject in data) {
		if (
			(bCustom && data[scoreObject].customGameModeName === newSelectedGameMode) ||
			(!bCustom && data[scoreObject].baseGameMode === newSelectedGameMode)
		) {
			if (matchingSongTitles.length === 0) {
				matchingSongTitles.push({
					value: data[scoreObject].songTitle,
					label: data[scoreObject].songTitle,
				});
			} else if (!matchingSongTitles.some((e) => e.value === data[scoreObject].songTitle)) {
				matchingSongTitles.push({
					value: data[scoreObject].songTitle,
					label: data[scoreObject].songTitle,
				});
			}
		}
	}
	return matchingSongTitles.sort((a, b) => a.value.localeCompare(b.value)) || [];
};

export const getMatchingDifficultyOptions = async (data, selectedGameMode, newSelectedSong) => {
	let matchingDifficulties = [];
	for (let scoreObject in data) {
		if (data[scoreObject].songTitle === newSelectedSong && data[scoreObject].baseGameMode === selectedGameMode) {
			if (matchingDifficulties.length === 0) {
				matchingDifficulties.push({
					value: data[scoreObject].difficulty,
					label: data[scoreObject].difficulty,
				});
			} else if (!matchingDifficulties.some((e) => e.value === data[scoreObject].difficulty)) {
				matchingDifficulties.push({
					value: data[scoreObject].difficulty,
					label: data[scoreObject].difficulty,
				});
			}
		}
	}
	return matchingDifficulties.sort((a, b) => a.value.localeCompare(b.value)) || [];
};

export const findMostRecentGameModeOption = async (data, gameModeOptions, bCustom = false) => {
	let mostRecent = null;
	for (let object in data) {
		if (
			(!bCustom && isDefaultGameMode(data[object]) && gameModeOptions.some((e) => e.value === data[object].baseGameMode)) ||
			(bCustom && isCustomGameMode(data[object]) && gameModeOptions.some((e) => e.value === data[object].customGameModeName))
		) {
			if (mostRecent === null) {
				mostRecent = data[object];
			}
			if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(data[object].time)) {
				mostRecent = data[object];
			}
		}
	}
	return bCustom ? mostRecent?.customGameModeName : mostRecent?.baseGameMode || null;
};

export const findMostRecentSongOption = async (data, songOptions, bCustom = false) => {
	let mostRecent = null;
	for (let object in data) {
		if (
			(!bCustom && isDefaultGameMode(data[object]) && songOptions.some((e) => e.value === data[object].songTitle)) ||
			(bCustom && isCustomGameMode(data[object]) && songOptions.some((e) => e.value === data[object].songTitle))
		) {
			if (mostRecent === null) {
				mostRecent = data[object];
			} else if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(data[object].time)) {
				mostRecent = data[object];
			}
		}
	}
	return mostRecent?.songTitle || null;
};

export const findMostRecentDifficultyOption = async (data, difficultyOptions) => {
	let mostRecent = null;
	for (let object in data) {
		if (
			data[object].gameModeType === "Preset" &&
			data[object].customGameModeName === "" &&
			difficultyOptions.some((e) => e.value === data[object].difficulty)
		) {
			if (mostRecent === null) {
				mostRecent = data[object];
			} else if (DateTime.fromISO(mostRecent.time) <= DateTime.fromISO(data[object].time)) {
				mostRecent = data[object];
			}
		}
	}
	return mostRecent?.difficulty || null;
};
