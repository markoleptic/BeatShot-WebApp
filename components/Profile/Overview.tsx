"use client";
import { GameModeTime, Score, usePlayerDataContext } from "@/context/PlayerDataContext";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import BarChart from "@/components/Charts/BarChart";
import Heatmap, { HeatMapCalendar } from "@/components/Charts/HeatMap";

const maxDefaultModesToShow = 8;
const maxCustomModesToShow = 8;

interface GameModeTimeShort {
	gameModeName: string;
	totalTime: number;
}

const ProfileOverview = () => {
	const { data, gameModeTimes } = usePlayerDataContext();
	const [totalTimePlayed, setTotalTimePlayed] = useState<number>(0);
	const [timePlayedHeatmap, setTimePlayedHeatmap] = useState<HeatMapCalendar[]>([]);
	const [defaultGameModeTimes, setDefaultGameModeTimes] = useState<GameModeTimeShort[]>([]);
	const [customGameModeTimes, setCustomGameModeTimes] = useState<GameModeTimeShort[]>([]);
	const [mostPlayedGameMode, setMostPlayedGameMode] = useState<string>();
	const [mostPlayedCustomGameMode, setMostPlayedCustomGameMode] = useState<string>();
	const [mostPlayedGameModeHours, setMostPlayedGameModeHours] = useState<number>(0);
	const [mostPlayedCustomGameModeHours, setMostPlayedCustomGameModeHours] = useState<number>(0);
	const [statsSubtitle, setStatsSubtitle] = useState<string>("");

	// initialize times data for page
	useEffect(() => {
		function initTimes(times: GameModeTime[]) {
			if (!times || times.length === 0) return;
			const defaultTimes = times
				.filter((item) => item.gameModeType === "Preset")
				.map(({ gameModeName, totalTime }) => ({ gameModeName, totalTime }));
			const customTimes = times
				.filter((item) => item.gameModeType === "Custom")
				.map(({ gameModeName, totalTime }) => ({ gameModeName, totalTime }));

			const totalTimeList = times;
			const sumTotalTime =
				Math.round(
					(totalTimeList.reduce((accumulator, currentValue) => accumulator + currentValue.totalTime, 0) /
						60 /
						60) *
						100
				) / 100;

			setTotalTimePlayed(sumTotalTime);
			setDefaultGameModeTimes(defaultTimes);
			setCustomGameModeTimes(customTimes);
			if (defaultTimes.length > 0) {
				setMostPlayedGameMode(defaultTimes[0].gameModeName || "");
				const num = Number((Math.round((defaultTimes[0].totalTime / 60 / 60) * 100) / 100).toFixed(2));
				setMostPlayedGameModeHours(num);
			}
			if (customTimes.length > 0) {
				setMostPlayedCustomGameMode(customTimes[0].gameModeName || "");
				const num = Number((Math.round((customTimes[0].totalTime / 60 / 60) * 100) / 100).toFixed(2));
				setMostPlayedCustomGameModeHours(num);
			}
		}
		if (gameModeTimes) {
			initTimes(gameModeTimes);
		}
	}, [gameModeTimes]);

	// initialize heatmap
	useEffect(() => {
		async function initHeatmap(scores: Score[]) {
			await generateHeatMap(scores);
			if (scores && scores.length > 0) {
				setStatsSubtitle("");
			} else if (scores && scores.length === 0) {
				setStatsSubtitle("No scores yet. Play the game!");
			}
		}
		if (data) {
			initHeatmap(data);
		}
	}, [data]);

	// sets the data for the heatmapLabels & timePlayedHeatmap
	const generateHeatMap = async (scores: Score[]) => {
		const calendar = await generateCalendar(scores);
		setTimePlayedHeatmap(calendar);
	};

	// returns a calendar based on user activity data
	const generateCalendar = async (scores: Score[]): Promise<HeatMapCalendar[]> => {
		let dateArr: HeatMapCalendar[] = [];
		const dataByDate = new Map<string, number>();

		// Preprocess data to group entries by date
		for (const scoreInst of scores) {
			const date = DateTime.fromISO(scoreInst.time).startOf("day").toISO();
			if (date == null) continue;
			const existing = dataByDate.get(date);
			if (existing) dataByDate.set(date, existing + scoreInst.songLength);
			else dataByDate.set(date, scoreInst.songLength);
		}

		let dt = DateTime.now().startOf("day").minus({ days: 364 });
		const end = DateTime.now().startOf("day");

		while (dt <= end) {
			const dateISO = dt.toISO();
			const v = dataByDate.get(dateISO) || 0;
			dateArr.push({
				x: dateISO,
				y: dt.weekday,
				d: dt,
				v: v,
			});
			dt = dt.plus({ day: 1 });
		}
		return dateArr;
	};

	const gameModeTimePlayedOptions = {
		title: "Most Played Default Game Modes",
		xAxisTitle: "Game Mode",
		yAxisTitle: "Time Played (hrs)",
		category: "timePlayed",
		bDisplayPercentage: true,
		maxEntries: maxDefaultModesToShow,
	};

	const customGameModeTimePlayedOptions = {
		title: "Most Played Custom Game Modes",
		xAxisTitle: "Custom Game Mode",
		yAxisTitle: "Time Played (hrs)",
		category: "timePlayed",
		bDisplayPercentage: true,
		maxEntries: maxCustomModesToShow,
	};

	const heatMapOptions = {
		title: "Play Frequency",
	};

	return (
		<>
			<div className="stats-header">
				<h2 className="stats-title">Overview</h2>
				{statsSubtitle !== "" ? <h5 className="stats-subtitle">{statsSubtitle}</h5> : <></>}
			</div>
			{!data || data.length === 0 ? (
				<></>
			) : (
				<>
					<div className="time-statistics-container">
						<ul className="best-list">
							<li className="table-header">
								<h2 className="fs-300 text-light">Time Statistics</h2>
							</li>
							<li className="table-row">
								<div className="col col-1">Total Time in any Game Mode:</div>
								<div className="col col-2  text-light fw-semibold">{totalTimePlayed || "0"}&nbsp;hrs</div>
							</li>
							<li className="table-row">
								<div className="col col-1">Most Played Default Mode:</div>
								<div className="col col-2"></div>
							</li>
							<li className="table-row">
								<div className="col col-1 padding-left-1rem">{mostPlayedGameMode}</div>
								<div className="col col-2 text-light fw-semibold">{mostPlayedGameModeHours || "0"}&nbsp;hrs</div>
							</li>
							<li className="table-row">
								<div className="col col-1">Most Played Custom Mode:</div>
								<div className="col col-2"></div>
							</li>
							<li className="table-row">
								<div className="col col-1 padding-left-1rem">{mostPlayedCustomGameMode}</div>
								<div className="col col-2 text-light fw-semibold">{mostPlayedCustomGameModeHours || "0"}&nbsp;hrs</div>
							</li>
						</ul>
					</div>
					<div>
						<BarChart
							labels={defaultGameModeTimes.map((item) => item.gameModeName)}
							data={defaultGameModeTimes.map((item) => item.totalTime)}
							options={gameModeTimePlayedOptions}
						/>
					</div>
					<div>
						<BarChart
							labels={customGameModeTimes.map((item) => item.gameModeName)}
							data={customGameModeTimes.map((item) => item.totalTime)}
							options={customGameModeTimePlayedOptions}
						/>
					</div>
					<div>
						<Heatmap data={timePlayedHeatmap} options={heatMapOptions} />
					</div>
				</>
			)}
		</>
	);
};

export default ProfileOverview;
