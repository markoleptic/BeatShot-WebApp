import { NextResponse, NextRequest } from "next/server";
import { users, scores } from "@/models";
import { UserIDParams } from "@/app/api/interfaces";

// secured by access token middleware
export async function POST(req: NextRequest, { params }: UserIDParams) {
  const userID = params.userID;
  const newScores = await req.json();
  const foundUser = await users.findOne({
    where: { userID: userID },
  });

  if (!foundUser) {
    return NextResponse.json({ message: "User not found." }, { status: 400 });
  }

  try {
    const existingScores = await scores.findAll({ raw: true, nest: true, where: { userID: foundUser.userID } });
    let times = [];

    for (let entry in existingScores) {
      times.push(existingScores[entry].time?.toJSON());
    }

    for (let scoreArray in newScores) {
      for (let scoreObject in newScores[scoreArray]) {
        if (!times.includes(newScores[scoreArray][scoreObject].time)) {
          scores.create({
            userID: foundUser.userID as string,
            baseGameMode: newScores[scoreArray][scoreObject].definingConfig.baseGameMode as string,
            gameModeType: newScores[scoreArray][scoreObject].definingConfig.gameModeType as string,
            difficulty: newScores[scoreArray][scoreObject].definingConfig.difficulty as string,
            customGameModeName: newScores[scoreArray][scoreObject].definingConfig.customGameModeName as string,
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
        }
      }
    }
    return NextResponse.json({ message: "Scores successfully added to database." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong." }, { status: 400 });
  }
}
