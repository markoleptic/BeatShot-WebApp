import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/profile/[userID]/savescores/route";
import * as appDeleteHandler from "app/api/profile/[userID]/deletescores/route";
import * as appScoreGetterHandler from "app/api/profile/[userID]/getscores/route";
import { DateTime } from "luxon";
import { scoresAttributes } from "@/models/scores";

function findMostRecentScore(scores: scoresAttributes[]): number {
	// Sort scores by time in descending order (most recent first)
	const sortedScores = scores.slice().sort((a, b) => {
		return DateTime.fromJSDate(a.time).toMillis() - DateTime.fromJSDate(b.time).toMillis();
	});

	// Return the first score (most recent) or undefined if array is empty
	return sortedScores[0].scoreID as number;
}

describe("Delete Scores Endpoint", () => {
	let scoreID = 0;
	it("Delete scores", async () => {
		await testApiHandler({
			paramsPatcher(params) {
				params.userID = process.env.TEST_USERID as string;
			},
			appHandler: appHandler,
			async test({ fetch }) {
				const res = await fetch({
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": "true",
						Authorization: `Bearer ${getAccessToken()}`,
					},
					method: "POST",
					body: JSON.stringify({
						scores: [
							{
								definingConfig: {
									gameModeType: "Custom",
									baseGameMode: "BeatGrid",
									customGameModeName: "TestSaveScores",
									difficulty: "None",
								},
								songTitle: "Song",
								songLength: 420.69,
								score: 15000,
								highScore: 15000,
								accuracy: 1,
								completion: 1.0,
								shotsFired: 150,
								targetsHit: 150,
								targetsSpawned: 150,
								totalPossibleDamage: 0,
								totalTimeOffset: 0.1,
								avgTimeOffset: 0.01,
								time: DateTime.now().toISO(),
								streak: 150,
								locationAccuracy: [
									{
										size: 5,
										accuracy: [1, 1, 1, 1, 1],
										totalSpawns: [6, 6, 6, 6, 6],
										totalHits: [6, 6, 6, 6, 6],
									},
									{
										size: 5,
										accuracy: [1, 1, 1, 1, 1],
										totalSpawns: [6, 6, 6, 6, 6],
										totalHits: [6, 6, 6, 6, 6],
									},
									{
										size: 5,
										accuracy: [1, 1, 1, 1, 1],
										totalSpawns: [6, 6, 6, 6, 6],
										totalHits: [6, 6, 6, 6, 6],
									},
									{
										size: 5,
										accuracy: [1, 1, 1, 1, 1],
										totalSpawns: [6, 6, 6, 6, 6],
										totalHits: [6, 6, 6, 6, 6],
									},
									{
										size: 5,
										accuracy: [1, 1, 1, 1, 1],
										totalSpawns: [6, 6, 6, 6, 6],
										totalHits: [6, 6, 6, 6, 6],
									},
								],
								bSavedToDatabase: false,
							},
						],
					}),
				});
				const data = await res.json();
				expect(res.status).toBe(200);
				expect(data).toEqual({ message: "Successfully added 1 scores to database." });
			},
		});
		await testApiHandler({
			paramsPatcher(params) {
				params.userID = process.env.TEST_USERID as string;
			},
			appHandler: appScoreGetterHandler,
			async test({ fetch }) {
				const res = await fetch({
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": "true",
						Authorization: `Bearer ${getAccessToken()}`,
					},
					method: "GET",
				});
				const data = await res.json();
				expect(res.status).toBe(200);
				scoreID = findMostRecentScore(data);
			},
		});
		await testApiHandler({
			paramsPatcher(params) {
				params.userID = process.env.TEST_USERID as string;
			},
			appHandler: appDeleteHandler,
			async test({ fetch }) {
				const res = await fetch({
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": "true",
						Authorization: `Bearer ${getAccessToken()}`,
					},
					method: "DELETE",
					body: JSON.stringify({
						scoreIDs: [scoreID],
					}),
				});
				const data = await res.json();
				expect(res.status).toBe(200);
				expect(data).toEqual({ "Number Removed": 1 });
			},
		});
	});
});
