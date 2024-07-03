import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/login/route";

describe("Login Endpoint", () => {
	it("Should receive refresh token", async () => {
		await testApiHandler({
			appHandler: appHandler,
			async test({ fetch }) {
				const response = await fetch({
					body: JSON.stringify({
						username: process.env.TEST_USERNAME,
						password: process.env.TEST_PASSWORD,
					}),
					headers: { "Content-Type": "application/json" },
					credentials: "same-origin",
					method: "POST",
				});
				const data = await response.json();
				expect(response.status).toBe(200);
				expect(data).toHaveProperty("accessToken");
				expect(response.headers.has("jwt"));
				setRefreshToken(data?.accessToken);
			},
		});
	});
});
