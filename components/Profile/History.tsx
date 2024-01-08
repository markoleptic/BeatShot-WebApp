"use client";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { usePlayerDataContext, Score } from "@/context/PlayerDataContext";

const ProfileHistory = () => {
	const { data, deleteScores } = usePlayerDataContext();
	const [sortedData, setSortedData] = useState<Score[]>([]);
	const [statsSubtitle, setStatsSubtitle] = useState<string>("");
	const [selectedScoreIDs, setSelectedScoreIDs] = useState<number[]>([]);
	const [lastSelectedScoreID, setLastSelectedScoreID] = useState(-1);

	useEffect(() => {
		if (data) {
			let scoreMap = new Map<DateTime, Score>();
			for (let scoreObject in data) {
				scoreMap.set(DateTime.fromISO(data[scoreObject].time), data[scoreObject]);
			}
			const values = [...scoreMap]
				.sort((a, b) => (a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0))
				.map(([dateTime, score]) => score);
			setSortedData(values);
			if (data.length > 0) {
				setStatsSubtitle("");
			} else if (data.length === 0) {
				setStatsSubtitle("No scores yet. Play the game!");
			}
		}
	}, [data]);

	const getScoreEntryTableRow = (entry: Score | null | undefined) => {
		if (!entry) return null;
		const time = DateTime.fromISO(entry.time);
		if (!time) return null;

		const gameModeName = entry.gameModeType === "Custom" ? entry.customGameModeName : entry.baseGameMode;

		if (gameModeName === undefined || entry.difficulty === undefined) return null;

		return (
			<tr key={entry.scoreID}>
				<td className="sticky-col">
					<input
						type="checkbox"
						onChange={(e) => handleCheckboxChange(e, entry.scoreID)}
						onKeyUp={(e) => handleCheckboxChange(e, entry.scoreID)}
						checked={selectedScoreIDs.includes(entry.scoreID)}
					/>
				</td>
				<td className="combined sticky-col2">
					<p>{time.toFormat("dd LLL yyyy") || ""}</p>
					<p>{entry.difficulty === "None" ? gameModeName : gameModeName + " | " + entry.difficulty}</p>
				</td>
				<td>
					<div>{entry.songTitle || ""}</div>
				</td>
				<td>{Math.round(entry.score) || ""}</td>
				<td>{Math.round(entry.accuracy * 100) + "%" || ""}</td>
				<td>{Math.round(entry.completion * 100) + "%" || ""}</td>
				<td>{entry.streak || ""}</td>
				<td>{entry.shotsFired || ""}</td>
				<td>{entry.targetsHit || ""}</td>
				<td>{entry.targetsSpawned || ""}</td>
				<td>{Math.round(entry.avgTimeOffset * 1000) / 1000 || ""}</td>
			</tr>
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
				const newArray = sortedData.map((item) => item.scoreID);
				setSelectedScoreIDs(newArray);
			} else {
				setSelectedScoreIDs([]);
			}
			return;
		}

		// If shift key is being held and there are previously selected rows
		if (shiftKey && selectedScoreIDs.length > 0 && lastSelectedScoreID > -1) {
			let startDataIdx = sortedData.findIndex((obj) => obj.scoreID === lastSelectedScoreID);
			let endDataIdx = sortedData.findIndex((obj) => obj.scoreID === scoreID);

			if (startDataIdx > endDataIdx) {
				const temp = startDataIdx;
				startDataIdx = endDataIdx;
				endDataIdx = temp;
			}

			const currentSelection = sortedData.slice(startDataIdx, endDataIdx + 1).map((item) => item.scoreID);

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
		const isConfirmed = window.confirm(`Are you sure you want to delete ${confText}? This action is irreversible.`);
		if (isConfirmed) {
			const responseMsg = await deleteScores(selectedScoreIDs);
			if ("Number Removed" in responseMsg) {
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
			{!sortedData || sortedData.length === 0 ? null : (
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
								<tbody>{sortedData.map((obj: Score) => getScoreEntryTableRow(obj))}</tbody>
							</table>
						</div>
						<div className="delete-score-container">
							<button
								className="delete-score-button fs-100"
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
