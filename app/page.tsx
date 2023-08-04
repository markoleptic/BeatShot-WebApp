import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Video from "@/components/Video";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="flex-container-column gap-1rem padding-1rem">
        <div className="home-centered-bordered-container">
          <Suspense fallback={<div className="video"></div>}>
            <Video />
          </Suspense>
          <Link
            href="https://store.steampowered.com/app/2126580?utm_source=beatshotwebsite&utm_medium=web"
            className="link hover-blue fw-semibold"
            referrerPolicy="strict-origin-when-cross-origin"
          >
            Purchase On Steam!
          </Link>
        </div>
        <div className="home-centered-bordered-container">
          <p className="fs-400 text-center ff-readable">
            BeatShot is rhythm-based aim-trainer that syncs targets to your music. Create custom game modes, view your
            stats, and make aim-training less of a chore.
          </p>
          <div className="pn-container">
            <ul>
              <li>
                <FontAwesomeIcon icon={faCrosshairs} />
                <p>Default Game Modes</p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>MultiBeat: continuously spawn targets</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>SingleBeat: only one at a time</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>BeatTrack: tracking one target</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>BeatGrid: static grid of activating targets</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>Cluster Beat: multiple targets spawn at once, each activated separately</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>Charged Beat Track: Multiple moving targets that require 2+ shots to destroy</p>
                  </li>
                </ul>
              </li>
              <li>
                <FontAwesomeIcon icon={faCrosshairs} />
                <p>Custom Game Modes</p>
                <ul>
                  <p>
                    Customize your own game mode by starting from a default mode template, or create one based on a
                    previously created custom mode. Customizable options include:
                  </p>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>spawn area height/width, including dynamic spawn area height/width</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>minimum and maximum size of targets, including dynamic target sizing</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>spawn beat delay</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>max target lifespan</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>minimum distance between targets</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>target spawn cooldown</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>move targets forward over their lifetime</p>
                  </li>
                </ul>
              </li>
              <li>
                <FontAwesomeIcon icon={faCrosshairs} />
                <p>Ahead-of-Time or Real-Time Audio Analysis</p>
                <ul>
                  <p>
                    When provided a song file, the game accounts for reaction time by analyzing a seperate audio track
                    from the one a player hears. The game can also listen to an audio device to provide real-time
                    analysis. The audio analyzer is customizable to account for different genres and personal
                    preference, including:
                  </p>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>Up to 24 user defined frequency band channels (e.g. 0-87 Hz for a bass channel)</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>threshold (sensitivity) for each band channel</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPlay} />
                    <p>time window of the frequency sample</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
