"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";

export interface Accuracy {
	accuracy: number[];
}

export interface Score {
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
}

export interface GameModeTime {
	gameModeName: string;
	gameModeType: string;
	totalTime: number;
}

export interface DeleteScoresResponse {
	"Number Removed": number;
}

export interface ErrorResponse {
	message: string;
}

export interface PlayerDataContextType {
	data: Score[] | null;
	gameModeTimes: GameModeTime[] | null;
	deleteScores: (scoreIDs: number[]) => Promise<DeleteScoresResponse | ErrorResponse>;
}

const PlayerDataContext = createContext<PlayerDataContextType | undefined>(undefined);

export const usePlayerDataContext = () => {
	const context = useContext(PlayerDataContext);
	if (!context) {
		throw new Error("usePlayerDataContext must be used within a PlayerDataProvider");
	}
	return context;
};

// provides the Authorization Bearer header to access protected player data
export const PlayerDataProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<Score[] | null>(null);
	const [gameModeTimes, SetGameModeTimes] = useState<GameModeTime[] | null>(null);
	const { auth, isAccessTokenValid, refreshAccessToken } = useAuthContext();

	const initializePlayerData = async () => {
		let localAuth = auth ? Object.assign({}, auth) : null;
		const isValid = await isAccessTokenValid();
		if (!isValid) localAuth = await refreshAccessToken();
		if (!localAuth) {
			return;
		}
		try {
			const response = await fetch(`/api/profile/${localAuth?.userID}/getscores`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${localAuth?.accessToken}`,
				},
				method: "GET",
			});
			const responseData = await response.json();
			if (response.status === 200) {
				setData(responseData);
			}
			const gameModeTimesResponse = await fetch(`/api/profile/${localAuth?.userID}/gettotaltimegamemodes`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${localAuth?.accessToken}`,
				},
				method: "GET",
			});
			const gameModeTimesResponseData = await gameModeTimesResponse.json();
			if (gameModeTimesResponse.status === 200) {
				SetGameModeTimes(gameModeTimesResponseData);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		initializePlayerData();
	}, []);

	const deleteScores = async (scoreIDs: number[]): Promise<DeleteScoresResponse | ErrorResponse> => {
		let localAuth = auth ? Object.assign({}, auth) : null;
		const isValid = await isAccessTokenValid();
		if (!isValid) localAuth = await refreshAccessToken();
		try {
			const deleteResponse = await fetch(`/api/profile/${localAuth?.userID}/deletescores`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${localAuth?.accessToken}`,
				},
				method: "DELETE",
				body: JSON.stringify({ scoreIDs }),
			});
			const deleteResponseData = await deleteResponse.json();
			console.log(deleteResponse, deleteResponseData);
			if (deleteResponse.status === 200) {
				initializePlayerData();
				return deleteResponseData as DeleteScoresResponse;
			}
			return deleteResponseData as ErrorResponse;
		} catch (err) {
			console.error(err);
			return { message: err as string };
		}
	};

	return (
		<PlayerDataContext.Provider
			value={{
				data,
				gameModeTimes,
				deleteScores,
			}}
		>
			{children}
		</PlayerDataContext.Provider>
	);
};
