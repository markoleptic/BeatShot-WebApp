import { users, scores } from "@/models";
import { Op } from "sequelize";
import { fetchSteamUser } from "@/util/ServerFunctions";
import bcrypt from "bcrypt";
import { saltRounds } from "@/types/Interfaces";

export async function findUser(userID: string): Promise<[string, users | null]>;
export async function findUser(userID: string, email: string): Promise<[string, users | null]>;

export async function findUser(arg1: string, arg2?: string): Promise<[string, users | null]> {
	if (arg2 === undefined) {
		let foundUser = await users.findOne({ where: { userID: arg1 } });
		if (!foundUser) return ["Unauthorized", null];
		if (foundUser.confirmed === 0) return ["Please confirm your email or request for a resend", foundUser];
		return ["", foundUser];
	} else {
		const foundUser = await users.findOne({
			where: {
				[Op.and]: [{ userID: arg1 }, { email: arg2 }],
			},
		});
		if (!foundUser) return ["Unauthorized", null];
		if (foundUser.confirmed === 0) return ["Please confirm your email or request for a resend", foundUser];
		return ["", foundUser];
	}
}

export async function findUserByEmail(email: string): Promise<[string, users | null]> {
	let foundUser = await users.findOne({ where: { email: email } });
	if (!foundUser) return ["No user found with that email", null];
	if (foundUser.confirmed === 0) return ["Please confirm your email or request for a resend", foundUser];
	return ["", foundUser];
}

export async function loginUser(username: string, email: string, password: string): Promise<[string, users | null]> {
	if ((username === "" && email === "") || (!username && !email) || !password) {
		return ["Username/Email and password are required.", null];
	}
	const foundUser =
		username === ""
			? await users.findOne({ where: { email: email } })
			: await users.findOne({ where: { username: username } });

	if (!foundUser) return ["User not found.", null];
	if (!foundUser.confirmed) return ["Please confirm your email or request for a resend.", foundUser];
	if ((foundUser.displayName === null || foundUser.displayName === "") && username !== "") {
		foundUser.update({ displayName: username });
	}

	return ["", foundUser];
}

export async function createUserFromRegister(queryResults: any, username: string, email: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const newUser = await users.create({
		userID: queryResults[0].nextUserID,
		username: username,
		displayName: username,
		confirmed: 0,
		steamLinked: 0,
		email: email,
		password: hashedPassword,
	});
	return newUser;
}

export async function findOrCreateUserFromSteam(userID: string, displayName: string): Promise<[string, users | null]> {
	const [user, created] = await users.findOrCreate({
		where: { userID: userID },
		defaults: {
			userID: userID,
			displayName: displayName,
			confirmed: 1,
			steamLinked: 1,
		},
	});

	if (!user) return ["Failed to find or create user.", null];

	return ["", user];
}

export async function findOrCreateUserFromSteamUser(userID: string): Promise<[string, users | null]> {
	const [errorMsg, steamUser] = await fetchSteamUser(userID);
	if (!steamUser) return [errorMsg, null];

	const [user, created] = await users.findOrCreate({
		where: { userID: userID },
		defaults: {
			userID: userID,
			displayName: steamUser.personaname,
			confirmed: 1,
			steamLinked: 1,
		},
	});

	if (!user) return ["Failed to find or create user.", null];

	return ["", user];
}

export async function deleteScoresByCustomGameModeName(userID: string, customGameModeName: string): Promise<number> {
	const NumRemoved = await scores.destroy({
		where: {
			[Op.and]: [{ userID: userID }, { gameModeType: "Custom" }, { customGameModeName: customGameModeName }],
		},
	});
	return NumRemoved;
}

export async function deleteScoresByScoreID(userID: string, scoreIDs: number[]): Promise<number> {
	if (scoreIDs.length === 0) return 0;
	const NumRemoved = await scores.destroy({
		where: {
			[Op.and]: [{ userID: userID }, { scoreID: { [Op.in]: scoreIDs } }],
		},
	});
	return NumRemoved;
}

export async function getScores(userID: string): Promise<[string, scores[] | null]> {
	const foundScores = await scores.findAll({
		raw: true,
		nest: true,
		where: { userID: userID },
	});
	return ["", foundScores];
}
