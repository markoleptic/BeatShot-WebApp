import { scores, users } from "@/models/index";
import { Op } from "sequelize";

const teardown = async (globalConfig: any, projectConfig: any) => {
	const cleanUp = async (): Promise<void> => {
		try {
			const result = await users.destroy({
				where: {
					createdAt: {
						[Op.gt]: global.startTime.toJSDate(),
					},
				},
			});
			console.log(`${result} users deleted.`);
		} catch (error) {
			console.error("Error removing users:", error);
			throw error;
		}
		try {
			const result = await scores.destroy({
				where: {
					time: {
						[Op.gt]: global.startTime.toJSDate(),
					},
				},
			});
			console.log(`${result} scores deleted.`);
		} catch (error) {
			console.error("Error removing scores:", error);
			throw error;
		}
	};
	cleanUp();
};
export default teardown;
