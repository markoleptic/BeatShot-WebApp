import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/sendfeedback/route";

describe("Send Feedback Endpoint", () => {
	it("Should send feedback email", async () => {
		await testApiHandler({
			appHandler: appHandler,
			async test({ fetch }) {
				const response = await fetch({
					body: JSON.stringify({
						title: "Test Feedback",
						content: "Test",
					}),
					headers: { "Content-Type": "application/json" },
					credentials: "same-origin",
					method: "POST",
				});
				expect(response.status).toBe(200);
			},
		});
	});
});
