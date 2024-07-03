import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/profile/[userID]/savescores/route";
import { DateTime } from "luxon";

describe("Save Scores Endpoint", () => {
	it("Should save scores", async () => {
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
	});
});
