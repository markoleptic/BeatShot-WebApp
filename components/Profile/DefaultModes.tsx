"use client";
import React, { useState, useEffect } from "react";
import LineChart from "@/components/Charts/LineChart";
import SelectBox from "@/components/SelectBox";
import { Score, usePlayerDataContext } from "@/context/PlayerDataContext";
import LocationAccuracyHeatmap from "@/components/Charts/LocationAccuracyMap";
import {
	getGameModes,
	getScores,
	getMatchingSongOptions,
	getMatchingDifficultyOptions,
	findMostRecentGameModeOption,
	findMostRecentSongOption,
	findMostRecentDifficultyOption,
	LabelValue,
	FilteredScore,
	updateBests,
	updateAvgs,
} from "@/util/StatFunctions";
import { DateFilter } from "./DateFilter";
import { DateTime } from "luxon";

const DefaultModes = () => {
	// Select box options
	const [gameModeOptions, setGameModeOptions] = useState<LabelValue[]>([]);
	const [songOptions, setSongOptions] = useState<LabelValue[]>([]);
	const [difficultyOptions, setDifficultyOptions] = useState<LabelValue[]>([]);

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
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
	const [statsSubtitle, setStatsSubtitle] = useState<string>("");

	// Hooks
	const { data } = usePlayerDataContext();

	// initialize data for page
	useEffect(() => {
		try {
			async function AsyncInitPageWrapper(data: Score[] | null) {
				await initPage(data);
			}
			if (data) {
				AsyncInitPageWrapper(data);
			}
		} catch (err) {
			console.log(err);
		}
	}, [data]);

	// initial render
	const initPage = async (data: Score[] | null) => {
		// game modes are the only thing that will always be the same
		if (!data) return;
		const modes = await getGameModes(data, false);
		setGameModeOptions(modes);
		const recent = await findMostRecentGameModeOption(data, modes, false);
		setSelectedGameMode(recent || "");

		if (data && data.length === 0) {
			setStatsSubtitle("No scores yet. Play the game!");
		} else {
			setStatsSubtitle("");
		}
	};

	// auto select most recently played game mode when game mode options refresh
	useEffect(() => {
		if (!data) return;
		findMostRecentGameModeOption(data, gameModeOptions, false).then((option) => setSelectedGameMode(option || ""));
	}, [gameModeOptions]);

	// auto select most recently played song when song options refresh
	useEffect(() => {
		if (!data) return;
		findMostRecentSongOption(data, songOptions, false).then((option) => setSelectedSong(option || ""));
	}, [songOptions]);

	// auto select most recently played difficulty when difficulty options refresh
	useEffect(() => {
		if (!data) return;
		findMostRecentDifficultyOption(data, difficultyOptions).then((option) => setSelectedDifficulty(option || ""));
	}, [difficultyOptions]);

	// update songs on game mode change
	useEffect(() => {
		if (!data) return;
		getMatchingSongOptions(data, selectedGameMode, false).then((options) => setSongOptions(options));
	}, [selectedGameMode]);

	// update difficulties on song change
	useEffect(() => {
		if (!data) return;
		getMatchingDifficultyOptions(data, selectedGameMode, selectedSong).then((options) =>
			setDifficultyOptions(options)
		);
	}, [selectedGameMode, selectedSong]);

	// executed when selected gamemode, song, or difficulty changes
	useEffect(() => {
		updateSelection(data, selectedGameMode, selectedSong, selectedDifficulty);
	}, [selectedGameMode, selectedSong, selectedDifficulty]);

	const onDateRangeChange = async (startDate: DateTime, endDate: DateTime) => {
		updateSelection(data, selectedGameMode, selectedSong, selectedDifficulty, [startDate, endDate]);
	};

	// updates the charts and info boxes
	const updateSelection = async (
		scores: Score[] | null,
		selectedGameMode: string,
		selectedSong: string,
		selectedDifficulty: string,
		dateRange: [DateTime, DateTime] | null = null
	) => {
		if (!scores) return;
		const { values, keys } = await getScores(
			scores,
			false,
			selectedGameMode,
			selectedSong,
			selectedDifficulty,
			dateRange
		);

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
				<h2 className="stats-title">Default Game Modes</h2>
				<h5 className="stats-subtitle">{statsSubtitle}</h5>
			</div>
			{!data || data.length === 0 ? (
				<></>
			) : (
				<>
					<div className="content-main">
						<div className="select-container">
							<div className="select-wrapper">
								<p className="select-caption fs-200">Game Mode:</p>
								<div className="select-wrapper">
									<SelectBox
										id="game-mode-select"
										onChange={(value) => setSelectedGameMode(value.value)}
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
										onChange={(value) => setSelectedSong(value.value)}
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
								<p className="select-caption fs-200">Difficulty:</p>
								<div className="select-wrapper">
									<SelectBox
										id="difficulty-select"
										onChange={(value) => setSelectedDifficulty(value.value)}
										placeholder={"Filter by Difficulty"}
										options={difficultyOptions}
										value={{
											label: selectedDifficulty,
											value: selectedDifficulty,
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
											onDateRangeChange={onDateRangeChange}
										></DateFilter>
									)}
								</div>
							</div>
						</div>
						<div id="best-avg" className="chart-scroll best-avg-container">
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
									<div className="col col-2">{bestAccuracy}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Streak:</div>
									<div className="col col-2">{bestStreak}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Reaction Time:</div>
									<div className="col col-2">{bestTimeOffset}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Targets Destroyed:</div>
									<div className="col col-2">{bestCompletion}</div>
								</li>
							</ul>
							<ul className="best-list">
								<li className="table-header">
									<h2 className="fs-300 text-light">Average</h2>
								</li>
								<li className="table-row">
									<div className="col col-1">Score:</div>
									<div className="col col-2">{avgScore}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Accuracy:</div>
									<div className="col col-2">{avgAccuracy}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Streak:</div>
									<div className="col col-2">{avgStreak}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Reaction Time:</div>
									<div className="col col-2">{avgTimeOffset}</div>
								</li>
								<li className="table-row">
									<div className="col col-1">Targets Destroyed:</div>
									<div className="col col-2">{avgCompletion}</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="content-main">
						<div id="scores-chart" className="chart-scroll">
							<LineChart
								labels={dates}
								data={scores ? scores.map((value) => value.score) : ""}
								options={scoreOptions}
							/>
						</div>
						<div id="accuracy-chart" className="chart-scroll">
							<LineChart
								labels={dates}
								data={scores ? scores.map((value) => value.accuracy) : ""}
								options={accuracyOptions}
							/>
						</div>
						<div id="completion-chart" className="chart-scroll">
							<LineChart
								labels={dates}
								data={scores ? scores.map((value) => value.completion) : ""}
								options={completionOptions}
							/>
						</div>
						<div id="streak-chart" className="chart-scroll">
							<LineChart
								labels={dates}
								data={scores ? scores.map((value) => value.streak) : ""}
								options={streakOptions}
							/>
						</div>
						<div id="avg-time-offset-chart" className="chart-scroll">
							<LineChart
								labels={dates}
								data={scores ? scores.map((value) => value.timeOffset) : ""}
								options={avgTimeOffsetOptions}
							/>
						</div>
						<div id="location-accuracy-chart" className="chart-scroll">
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

export default DefaultModes;
