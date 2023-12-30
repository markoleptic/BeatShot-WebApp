"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "../components/Auth/AuthContext";

export interface Accuracy {
	accuracy: number[];
}

export interface LocationAccuracy {
	locationAccuracy: Accuracy[];
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
	locationAccuracy: LocationAccuracy | null;
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

export interface DeleteScoresResponse {
	"Number Removed": number;
}

export interface ErrorResponse {
	message: string;
}

export interface PlayerDataContextType {
	data: Score[] | null;
	customGameModesTime: object[];
	defaultGameModesTime: object[];
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
	const [customGameModesTime, SetCustomGameModesTime] = useState<object[]>([]);
	const [defaultGameModesTime, SetDefaultGameModesTime] = useState<object[]>([]);
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

			const customResponse = await fetch(`/api/profile/${localAuth?.userID}/gettotaltimecustomgamemodes`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${localAuth?.accessToken}`,
				},
				method: "GET",
			});
			const customResponseData = await customResponse.json();
			if (customResponse.status === 200) {
				SetCustomGameModesTime(customResponseData);
			}

			const defaultResponse = await fetch(`/api/profile/${localAuth?.userID}/gettotaltimedefaultgamemodes`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${localAuth?.accessToken}`,
				},
				method: "GET",
			});
			const defaultResponseData = await defaultResponse.json();
			if (defaultResponse.status === 200) {
				SetDefaultGameModesTime(defaultResponseData);
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
				customGameModesTime,
				defaultGameModesTime,
				deleteScores,
			}}
		>
			{children}
		</PlayerDataContext.Provider>
	);
};
