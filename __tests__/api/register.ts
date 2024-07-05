import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/register/route";

describe("Register Endpoint", () => {
	it("Should send confirmation email", async () => {
		await testApiHandler({
			appHandler: appHandler,
			async test({ fetch }) {
				const response = await fetch({
					body: JSON.stringify({
						username: process.env.TEST_NEW_USERNAME,
						email: process.env.TEST_NEW_EMAIL,
						password: process.env.TEST_NEW_PASSWORD,
					}),
					headers: { "Content-Type": "application/json" },
					credentials: "same-origin",
					method: "POST",
				});
				const data = await response.json();
				expect(response.status).toBe(200);
			},
		});
	});
});
