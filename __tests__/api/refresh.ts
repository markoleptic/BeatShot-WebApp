import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/refresh/route";
import { NextRequest } from "next/server";

describe("Refresh Endpoint", () => {
	it("Should use refresh token to get access token", async () => {
		await testApiHandler({
			appHandler: appHandler,
			requestPatcher(request: NextRequest) {
				request.cookies.set("jwt", getRefreshToken());
			},
			async test({ fetch }) {
				const res = await fetch({
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					method: "GET",
				});
				expect(res.status).toBe(200);
				const data = await res.json();
				expect(data).toHaveProperty("accessToken");
				setAccessToken(data.accessToken);
			},
		});
	});
});
