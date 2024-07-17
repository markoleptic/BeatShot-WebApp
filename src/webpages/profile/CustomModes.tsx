"use client";
import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";

import LineChart from "@/components/charts/LineChart";
import LocationAccuracyHeatmap from "@/components/charts/LocationAccuracyMap";
import DateFilter from "@/components/DateFilter";
import SelectBox from "@/components/SelectBox";
import { usePlayerDataContext } from "@/context/PlayerDataContext";
import {
	findMostRecentGameModeOption, findMostRecentSongOption, getGameModes, getMatchingSongOptions,
	getScores, updateAvgs, updateBests
} from "@/utility/StatFunctions";

import "@/styles/GameModes.scss";

import type { LabelValue } from "@/types/chart.types";
import type { FilteredScore } from "@/types/profile.types";
import type { Score } from "@/types/score.types";
const CustomModes = () => {
	// Select box options
	const [gameModeOptions, setGameModeOptions] = useState<LabelValue[]>([]);
	const [songOptions, setSongOptions] = useState<LabelValue[]>([]);

	// Data passed to Line Chart
	const [scores, setScores] = useState<FilteredScore[]>([]);
	const [dates, setDates] = useState<string[]>([]);
	const [minDate, setMinDate] = useState<DateTime | null>(null);
	const [maxDate, setMaxDate] = useState<DateTime | null>(null);

	// Best/Average Text Box values
	const [bestScore, setBestScore] = useState<string>("");
	const [bestAccuracy, setBestAccuracy] = useState<string>("");
	const [bestStreak, setBestStreak] = useState<string>("");
	const [bestCompletion, setBestCompletion] = useState<string>("");
	const [bestTimeOffset, setBestTimeOffset] = useState<string>("");
	const [avgScore, setAvgScore] = useState<string>("");
	const [avgAccuracy, setAvgAccuracy] = useState<string>("");
	const [avgStreak, setAvgStreak] = useState<string>("");
	const [avgCompletion, setAvgCompletion] = useState<string>("");
	const [avgTimeOffset, setAvgTimeOffset] = useState<string>("");

	// Tracks currently selected options from Select boxes
	const [selectedGameMode, setSelectedGameMode] = useState<string>("");
	const [selectedSong, setSelectedSong] = useState<string>("");
	const [statsSubtitle, setStatsSubtitle] = useState<string>("");

	// Hooks
	const { data } = usePlayerDataContext();

	// update game modes when data changes
	useEffect(() => {
		if (!data) return;
		getGameModes(data, true).then((modes) => setGameModeOptions(modes));
		setStatsSubtitle(data.length === 0 ? "No scores yet. Play the game!" : "");
	}, [data]);

	// update songs on game mode change
	useEffect(() => {
		if (!data) return;
		getMatchingSongOptions(data, selectedGameMode, true).then((options) => setSongOptions(options));
	}, [data, selectedGameMode]);

	// auto select most game mode
	useEffect(() => {
		if (!data) return;
		findMostRecentGameModeOption(data, gameModeOptions, true).then((option) => setSelectedGameMode(option || ""));
	}, [data, gameModeOptions]);

	// auto select most recent song
	useEffect(() => {
		if (!data) return;
		findMostRecentSongOption(data, songOptions, true).then((option) => setSelectedSong(option || ""));
	}, [data, songOptions]);

	// executed when selected gamemode, song, or difficulty changes
	useEffect(() => {
		updateSelection(data, selectedGameMode, selectedSong);
	}, [data, selectedGameMode, selectedSong]);

	// updates the charts and info boxes
	const updateSelection = async (
		scores: Score[] | null,
		selectedGameMode: string,
		selectedSong: string,
		dateRange: [DateTime, DateTime] | null = null
	) => {
		if (!scores) return;
		const { keys, values } = await getScores(scores, true, selectedGameMode, selectedSong, "", dateRange);

		setScores(values);
		setDates(keys);

		if (!dateRange && keys.length > 0) {
			setMaxDate(DateTime.max(...keys.map((date) => DateTime.fromISO(date))).endOf("day"));
			setMinDate(DateTime.min(...keys.map((date) => DateTime.fromISO(date))).startOf("day"));
		}

		await updateBests(values, setBestScore, setBestAccuracy, setBestCompletion, setBestTimeOffset, setBestStreak);
		await updateAvgs(values, setAvgScore, setAvgAccuracy, setAvgCompletion, setAvgTimeOffset, setAvgStreak);
	};

	const scoreOptions = {
		title: "Score vs Time",
		xAxisTitle: "Date",
		yAxisTitle: "Score (thousands)",
		category: "score",
		bDisplayPercentage: true,
	};
	const accuracyOptions = {
		title: "Accuracy vs Time",
		xAxisTitle: "Date",
		yAxisTitle: "Hit Rate (%)",
		category: "accuracy",
		bDisplayPercentage: false,
	};
	const streakOptions = {
		title: "Streak vs Time",
		xAxisTitle: "Date",
		yAxisTitle: "Consecutive Targets Hit",
		category: "streak",
		bDisplayPercentage: false,
	};
	const completionOptions = {
		title: "Average Targets Destroyed",
		xAxisTitle: "Date",
		yAxisTitle: "Completion (%)",
		category: "completion",
		bDisplayPercentage: false,
	};
	const avgTimeOffsetOptions = {
		title: "Average Reaction Time",
		xAxisTitle: "Date",
		yAxisTitle: "Time (ms)",
		category: "avgTimeOffset",
		bDisplayPercentage: false,
	};
	const locationAccuracyOptions = {
		title: "Location Accuracy Heatmap",
		xAxisTitle: "",
		yAxisTitle: "",
		type: "locationAccuracy",
	};

	return (
		<>
			<div className="stats-header">
				<h2 className="stats-title">Custom Game Modes</h2>
				{statsSubtitle !== "" ? <h5 className="stats-subtitle">{statsSubtitle}</h5> : <></>}
			</div>
			{!scores || scores.length === 0 ? (
				<></>
			) : (
				<>
					<div className="content-main">
						<div className="select-container">
							<div className="select-wrapper">
								<p className="select-caption fs-200">GameMode:</p>
								<div className="select-wrapper">
									<SelectBox
										id="game-mode-select"
										onChange={(newValue, _) => setSelectedGameMode(newValue.value)}
										placeholder={"Filter by game mode"}
										options={gameModeOptions}
										value={{
											label: selectedGameMode,
											value: selectedGameMode,
										}}
									/>
								</div>
							</div>
							<div className="select-wrapper">
								<p className="select-caption fs-200">Song:</p>
								<div className="select-wrapper">
									<SelectBox
										id="song-select"
										onChange={(newValue, _) => setSelectedSong(newValue.value)}
										placeholder={"Filter by song"}
										options={songOptions}
										value={{
											label: selectedSong,
											value: selectedSong,
										}}
									/>
								</div>
							</div>
							<div className="select-wrapper">
								<p className="select-caption fs-200">Time Range:</p>
								<div className="select-wrapper">
									{!minDate || !maxDate ? (
										<></>
									) : (
										<DateFilter
											minDate={minDate}
											range={Math.floor(maxDate.diff(minDate, "days").days)}
											onDateRangeChange={(startDate, endDate) =>
												updateSelection(data, selectedGameMode, selectedSong, [
													startDate,
													endDate,
												])
											}
										></DateFilter>
									)}
								</div>
							</div>
						</div>
						<div className="best-avg-container">
							<ul className="best-list">
								<li className="table-header">
									<h2 className="fs-300 text-light">Best</h2>
								</li>
								<li className="table-row">
									<div className="col col-1">Score:</div>
									<div className="col col-2">{bestScore}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Accuracy:</div>
									<div className="col col-2">{bestAccuracy || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Streak:</div>
									<div className="col col-2">{bestStreak || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Reaction Time:</div>
									<div className="col col-2">{bestTimeOffset || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Targets Destroyed:</div>
									<div className="col col-2">{bestCompletion || ""}</div>
								</li>
							</ul>
							<ul className="best-list">
								<li className="table-header">
									<h2 className="fs-300 text-light">Average</h2>
								</li>
								<li className="table-row">
									<div className="col col-1">Score:</div>
									<div className="col col-2">{avgScore || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Accuracy:</div>
									<div className="col col-2">{avgAccuracy || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Streak:</div>
									<div className="col col-2">{avgStreak || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Reaction Time:</div>
									<div className="col col-2">{avgTimeOffset || ""}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Targets Destroyed:</div>
									<div className="col col-2">{avgCompletion || ""}</div>
								</li>
							</ul>
						</div>
					</div>
					<div className={"content-main"}>
						<div>
							<LineChart
								labels={dates}
								data={scores.map((value) => value.score)}
								options={scoreOptions}
							/>
						</div>
						<div>
							<LineChart
								labels={dates}
								data={scores.map((value) => value.accuracy)}
								options={accuracyOptions}
							/>
						</div>
						<div>
							<LineChart
								labels={dates}
								data={scores.map((value) => value.completion)}
								options={completionOptions}
							/>
						</div>
						<div>
							<LineChart
								labels={dates}
								data={scores.map((value) => value.streak)}
								options={streakOptions}
							/>
						</div>
						<div>
							<LineChart
								labels={dates}
								data={scores.map((value) => value.timeOffset)}
								options={avgTimeOffsetOptions}
							/>
						</div>
						<div>
							<LocationAccuracyHeatmap
								data={scores.map((value) => value.locationAccuracy)}
								options={locationAccuracyOptions}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default CustomModes;
