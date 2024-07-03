import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/profile/[userID]/getscores/route";

describe("Get Scores Endpoint", () => {
	it("Should get scores", async () => {
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
				expect(data[0]).toHaveProperty("userID");
				expect(data[0]).toHaveProperty("scoreID");
			},
		});
	});
});
