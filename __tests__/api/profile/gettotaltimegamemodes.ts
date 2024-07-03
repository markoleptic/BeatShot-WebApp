import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/profile/[userID]/gettotaltimegamemodes/route";

describe("Get Game Mode Time Endpoint", () => {
	it("Should get total time for all game modes", async () => {
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
					method: "GET",
				});
				const data = await res.json();
				expect(res.status).toBe(200);
				expect(data).toBeInstanceOf(Array);
				expect(data[0]).toHaveProperty("gameModeName");
				expect(data[0]).toHaveProperty("gameModeType");
				expect(data[0]).toHaveProperty("totalTime");
			},
		});
	});
});
