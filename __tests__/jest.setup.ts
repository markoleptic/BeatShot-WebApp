declare global {}

const setup = async (globalConfig: any, projectConfig: any) => {};

export default setup;

//requestPatcher is optional
// requestPatcher(request: NextRequest) {
// 	request.headers.set("key", process.env.SPECIAL_TOKEN as string);
// },
//responsePatcher is optional
// async responsePatcher(response: Response) {
// 	const json = await response.json();
// 	return Response.json(json.apiSuccess ? { hello: "world!" } : { goodbye: "cruel world" });
// },
