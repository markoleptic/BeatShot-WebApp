import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "app/api/login/route";

declare global {
	var accessToken: string;
	var refreshToken: string;
	function setAccessToken(token: string): void;
	function setRefreshToken(token: string): void;
	function getAccessToken(): string;
	function getRefreshToken(): string;
}

global.accessToken = "";

global.refreshToken = "";

global.setAccessToken = (token: string) => {
	accessToken = token;
};

global.setRefreshToken = (token: string) => {
	refreshToken = token;
};

global.getAccessToken = (): string => refreshToken;

global.getRefreshToken = (): string => refreshToken;

beforeAll(async (): Promise<void> => {
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
			setRefreshToken(response.cookies.at(0)?.jwt);
			setAccessToken(data?.accessToken);
		},
	});
});

//requestPatcher is optional
// requestPatcher(request: NextRequest) {
// 	request.headers.set("key", process.env.SPECIAL_TOKEN as string);
// },
//responsePatcher is optional
// async responsePatcher(response: Response) {
// 	const json = await response.json();
// 	return Response.json(json.apiSuccess ? { hello: "world!" } : { goodbye: "cruel world" });
// },
