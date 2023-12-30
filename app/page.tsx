import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Timing from "../public/BeatShotTiming_large.png";
import StatsPreview from "../public/Stats_Preview.gif";
import Image from "next/image";
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
						BeatShot is rhythm-based aim-trainer that syncs targets to your music. Create custom game modes,
						view your stats, and make aim-training less of a chore.
					</p>
					<div className="pn-container">
						<ul>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Advanced Audio Analysis</p>
								<ul>
									<p>
										The audio analyzer keeps a rolling average of the frequency values across
										multiple channels. When it detects a change in frequency that is very different
										from the current rolling average, targets are spawned. The frequency channels
										(e.g. 0-87 Hz for a bass channel) and the sensitivity for each channel can be
										fine-tuned in the settings menu.
									</p>
									<p>
										When you provide the game with a song file, it analyzes a separate audio track
										from the one you actually hear. This offset allows the game to account for
										reaction time. Here&#39;s a short breakdown, using 0.25 seconds for reaction
										time:
									</p>
								</ul>
							</li>
							<div className="front-page-img-container">
								<Image
									className="front-page-img"
									priority
									src={Timing}
									quality={100}
									alt="timing-example"
								/>
							</div>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Default Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>MultiBeat:</b> continuously spawn targets
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>SingleBeat:</b> only one at a time
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>BeatTrack:</b> tracking one target
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>BeatGrid:</b> static grid of activating targets
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>Cluster Beat:</b> multiple targets spawn at once, each activated
											separately
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>Charged Beat Track:</b> Multiple moving targets that require 2+ shots to
											destroy
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>And more!</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Custom Game Modes</p>
								<ul>
									<p>
										Customize your own game mode from scratch, a default mode template, or a
										previously created custom mode. Preview the game mode while editing it in the
										menu so you know exactly what it will look like before you play it. Import a
										custom mode from a friend, or export yours to them.
									</p>
									<p>There are currently 50+ customizable settings, including:</p>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Damage required for deactivation</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Minimum and maximum target size, including dynamic target sizing</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Spawn area height/width, including dynamic spawn area height/width</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Spawn beat delay</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target activation, deactivation, destruction conditions</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target lifespan</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target movement</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target spawn cooldown</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>And a lot more!</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Detailed Scoring Analysis</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>Overview:</b> shows time played statistics across all modes and play
											frequency
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>Default Modes:</b> select a game mode, song, and difficulty (see gif
											below)
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>Custom:</b> select a custom game mode and song
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											<b>History:</b> shows every score entry you&#39;ve ever saved
										</p>
									</li>
								</ul>
							</li>
							<div className="front-page-img-container">
								<Image
									className="front-page-img"
									priority
									src={StatsPreview}
									quality={100}
									alt="stats-preview"
								/>
							</div>

							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Predictive Aim Training</p>
								<ul>
									<p>
										BeatShot leverages the power of reinforcement learning to dynamically predict
										target spawn locations tailored to your unique playstyle.
									</p>
									<p>
										Rather than basing the prediction model on accuracy across all spawn locations,
										our algorithm goes the extra mile. It tracks how accurate you are at hitting
										targets from every spawn location to every other spawn location, creating a
										detailed map of your precision across the entire training area. The model adapts
										quickly to changes in performance, and can be customized further by tuning the
										parameters in the Custom Game Modes menu.
									</p>
									<p>
										This is an opt-in feature for Custom Game Modes only to retain a consistent
										experience for Default Game Modes.
									</p>
								</ul>
							</li>

							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Other Settings</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Custom crosshair creator</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Change all colors that a target cycles through</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Standard video/audio settings, including DLSS 3.5</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Sensitivity based on two common competitive FPS games</p>
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
