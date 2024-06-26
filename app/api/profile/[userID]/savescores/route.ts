import { NextResponse, NextRequest } from "next/server";
import { users, scores } from "@/models/index";
import type { UserIDParams } from "@/types/auth.types";

// secured by access token middleware
export async function POST(req: NextRequest, { params }: { params: UserIDParams }) {
	const newScores = await req.json();
	let numCreated = 0;
	const foundUser = await users.findOne({
		where: { userID: params.userID },
	});

	if (!foundUser) {
		return NextResponse.json({ message: "User not found." }, { status: 400 });
	}

	try {
		for (let scoreArray in newScores) {
			for (let scoreObject in newScores[scoreArray]) {
				try {
					scores.create({
						userID: foundUser.userID,
						baseGameMode: newScores[scoreArray][scoreObject].definingConfig.baseGameMode as string,
						gameModeType: newScores[scoreArray][scoreObject].definingConfig.gameModeType as string,
						difficulty: newScores[scoreArray][scoreObject].definingConfig.difficulty as string,
						customGameModeName: newScores[scoreArray][scoreObject].definingConfig
							.customGameModeName as string,
						songTitle: newScores[scoreArray][scoreObject].songTitle as string,
						songLength: newScores[scoreArray][scoreObject].songLength as number,
						score: newScores[scoreArray][scoreObject].score as number,
						highScore: newScores[scoreArray][scoreObject].highScore as number,
						accuracy: newScores[scoreArray][scoreObject].accuracy as number,
						completion: newScores[scoreArray][scoreObject].completion as number,
						shotsFired: newScores[scoreArray][scoreObject].shotsFired as number,
						targetsHit: newScores[scoreArray][scoreObject].targetsHit as number,
						targetsSpawned: newScores[scoreArray][scoreObject].targetsSpawned as number,
						totalPossibleDamage: newScores[scoreArray][scoreObject].totalPossibleDamage as number,
						totalTimeOffset: newScores[scoreArray][scoreObject].totalTimeOffset as number,
						avgTimeOffset: newScores[scoreArray][scoreObject].avgTimeOffset as number,
						time: newScores[scoreArray][scoreObject].time as Date,
						streak: newScores[scoreArray][scoreObject].streak as number,
						locationAccuracy: newScores[scoreArray][scoreObject].locationAccuracy as object,
					});
					numCreated++;
				} catch (error) {
					console.error(error);
				}
			}
		}
		return NextResponse.json({ message: `Successfully added ${numCreated} scores to database.` }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
	}
}
