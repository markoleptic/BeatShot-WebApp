"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import type { GameModeTime, Score } from "@/types/score.types";

type DeleteScoresResponse = {
	"Number Removed": number;
};

type ErrorResponse = {
	message: string;
};

type PlayerDataContextType = {
	data: Score[] | null;
	gameModeTimes: GameModeTime[] | null;
	deleteScores: (scoreIDs: number[]) => Promise<DeleteScoresResponse | ErrorResponse>;
};

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
	const refresh = useRefreshToken();

	const initializingPlayerData = useRef(false);

	const initializePlayerData = async () => {
		if (initializingPlayerData.current) return;
		initializingPlayerData.current = true;
		try {
			const freshAuthData = await refresh();
			const response = await fetch(`/api/profile/${freshAuthData?.userID}/getscores`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${freshAuthData?.accessToken}`,
				},
				method: "GET",
			});
			const responseData = await response.json();
			if (response.status === 200) {
				setData(responseData);
			}
			const gameModeTimesResponse = await fetch(`/api/profile/${freshAuthData?.userID}/gettotaltimegamemodes`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${freshAuthData?.accessToken}`,
				},
				method: "GET",
			});
			const gameModeTimesResponseData = await gameModeTimesResponse.json();
			if (gameModeTimesResponse.status === 200) {
				SetGameModeTimes(gameModeTimesResponseData);
			}
		} catch (err) {
			console.log(err);
		} finally {
			initializingPlayerData.current = false;
		}
	};

	useEffect(() => {
		initializePlayerData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteScores = async (scoreIDs: number[]): Promise<DeleteScoresResponse | ErrorResponse> => {
		try {
			const freshAuthData = await refresh();
			if (!freshAuthData) return { message: "Unauthorized" };
			const deleteResponse = await fetch(`/api/profile/${freshAuthData?.userID}/deletescores`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					Authorization: `Bearer ${freshAuthData?.accessToken}`,
				},
				method: "DELETE",
				body: JSON.stringify({ scoreIDs }),
			});
			const deleteResponseData = await deleteResponse.json();
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
