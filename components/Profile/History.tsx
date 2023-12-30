"use client";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { usePlayerDataContext, Score, DeleteScoresResponse, ErrorResponse } from "@/context/PlayerDataContext";

const ProfileHistory = () => {
	const { data, deleteScores } = usePlayerDataContext();
	const [sortedData, setSortedData] = useState<Score[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [statsSubtitle, setStatsSubtitle] = useState<string>("");
	const [selectedScoreIDs, setSelectedScoreIDs] = useState<number[]>([]);
	const [lastSelectedScoreID, setLastSelectedScoreID] = useState(-1);

	useEffect(() => {
		if (data) {
			console.log(data);
			let scoreMap = new Map<DateTime, Score>();
			for (let scoreObject in data) {
				scoreMap.set(DateTime.fromISO(data[scoreObject].time), data[scoreObject]);
			}
			const values = [...scoreMap]
				.sort((a, b) => (a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0))
				.map(([dateTime, score]) => score);
			setSortedData(values);
			setIsLoaded(true);
			if (data && data.length > 0) {
				setStatsSubtitle("");
			} else if (data && data.length === 0) {
				setStatsSubtitle("No scores yet. Play the game!");
			}
		}
	}, [data]);

	const getData = (): Score[] => {
		return isLoaded ? sortedData : [];
	};

	const getCombined = (date: string, name: string, difficulty: string) => {
		return (
			<td className="combined sticky-col2">
				<p>{date}</p>
				<p>{difficulty === "None" ? name : name + " | " + difficulty}</p>
			</td>
		);
	};

	const handleCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
		scoreID: number
	) => {
		let checked = false;
		let shiftKey = false;

		if (e.type === "keyup") {
			const event = e as React.KeyboardEvent<HTMLInputElement>;
			if (!event || event.key !== "Enter") return;
			shiftKey = event.nativeEvent.shiftKey;
			checked = !(e.target as HTMLInputElement).checked;
		} else if (e.type == "change") {
			shiftKey = e.nativeEvent instanceof MouseEvent && e.nativeEvent.shiftKey;
			checked = (e.target as HTMLInputElement).checked;
		} else return;

		// Select/Deselect all
		if (scoreID == -1) {
			if (checked) {
				const newArray = getData().map((item) => item.scoreID);
				setSelectedScoreIDs(newArray);
			} else {
				setSelectedScoreIDs([]);
			}
			return;
		}

		// If shift key is being held and there are previously selected rows
		if (shiftKey && selectedScoreIDs.length > 0 && lastSelectedScoreID > -1) {
			let startDataIdx = getData().findIndex((obj) => obj.scoreID === lastSelectedScoreID);
			let endDataIdx = getData().findIndex((obj) => obj.scoreID === scoreID);

			if (startDataIdx > endDataIdx) {
				const temp = startDataIdx;
				startDataIdx = endDataIdx;
				endDataIdx = temp;
			}

			const currentSelection = getData()
				.slice(startDataIdx, endDataIdx + 1)
				.map((item) => item.scoreID);

			const newSelection = checked
				? Array.from(new Set([...selectedScoreIDs, ...currentSelection]))
				: selectedScoreIDs.filter((id) => id !== scoreID && !currentSelection.includes(id));

			setSelectedScoreIDs(newSelection);
		}
		// If Shift key is not being held or there are no previously selected rows
		else {
			const newSelection = checked
				? Array.from(new Set([...selectedScoreIDs, scoreID]))
				: selectedScoreIDs.filter((id) => id !== scoreID);

			setLastSelectedScoreID(scoreID);
			setSelectedScoreIDs(newSelection);
		}
	};

	const onDeleteButtonClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (selectedScoreIDs.length === 0) return;
		const confText = selectedScoreIDs.length === 1 ? "1 score entry" : `${selectedScoreIDs.length} score entries`;
		const isConfirmed = window.confirm(
			`Are you sure you want to delete ${confText}? This action is irreversible.`
		);
		if (isConfirmed) {
			const responseMsg = await deleteScores(selectedScoreIDs);
			console.log(responseMsg);
			if ("Number Removed" in responseMsg) {
				console.log(responseMsg["Number Removed"]);
				setLastSelectedScoreID(-1);
				setSelectedScoreIDs([]);
			} else if ("message" in responseMsg) {
				console.log(responseMsg.message);
			}
		}
	};

	return (
		<>
			<div className="stats-header">
				<h2 className="stats-title">History</h2>
				{statsSubtitle !== "" ? <h5 className="stats-subtitle">{statsSubtitle}</h5> : <></>}
			</div>
			{!data || data.length === 0 ? (
				<></>
			) : (
				<div className="content-main">
					<div className="table-wrapper">
						<div className="table-container">
							<table className="history-table">
								<thead>
									<tr className="tr-header">
										<th className="sticky-col">
											<input
												type="checkbox"
												onChange={(e) => handleCheckboxChange(e, -1)}
												onKeyUp={(e) => handleCheckboxChange(e, -1)}
												checked={selectedScoreIDs.length == sortedData.length}
											/>
										</th>
										<th className="sticky-col2">Date & Mode</th>
										<th>Song</th>
										<th>Score</th>
										<th>Accu&shy;racy</th>
										<th>Comple&shy;tion</th>
										<th>Streak</th>
										<th>Shots Fired</th>
										<th>Targets Hit</th>
										<th>Targets Spawned</th>
										<th>Avg Time Offset</th>
									</tr>
								</thead>
								<tbody>
									{getData().map((obj: Score) => {
										return (
											<tr key={obj.scoreID}>
												<td className="sticky-col">
													<input
														type="checkbox"
														onChange={(e) => handleCheckboxChange(e, obj.scoreID)}
														onKeyUp={(e) => handleCheckboxChange(e, obj.scoreID)}
														checked={selectedScoreIDs.includes(obj.scoreID)}
													/>
												</td>
												{getCombined(
													DateTime.fromISO(obj.time).toFormat("dd LLL yyyy") || "",
													(obj.gameModeType === "Custom"
														? obj.customGameModeName
														: obj.baseGameMode) || "",
													obj.difficulty || ""
												)}
												<td>
													<div>{obj.songTitle || ""}</div>
												</td>
												<td>{Math.round(obj.score) || ""}</td>
												<td>{Math.round(obj.accuracy * 100) + "%" || ""}</td>
												<td>{Math.round(obj.completion * 100) + "%" || ""}</td>
												<td>{obj.streak || ""}</td>
												<td>{obj.shotsFired || ""}</td>
												<td>{obj.targetsHit || ""}</td>
												<td>{obj.targetsSpawned || ""}</td>
												<td>{Math.round(obj.avgTimeOffset * 1000) / 1000 || ""}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="delete-score-container">
							<button
								className="delete-score-button"
								id="delete-button"
								onClick={onDeleteButtonClicked}
								disabled={selectedScoreIDs.length == 0}
							>
								Delete Selected
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default ProfileHistory;
