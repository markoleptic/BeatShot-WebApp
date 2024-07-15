import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Timing from "public/frontPage/BeatShotTiming_large.png";
import StatsPreview from "public/frontPage/Stats_Preview.gif";
import Image from "next/image";
import Video from "@/components/Video";
import SteamSteamPurchaseLink from "@/components/SteamPurchaseLink";
import "@/styles/Home.scss";

const Home = () => {
	return (
		<>
			<div className="flex-container-column gap-1rem padding-1rem">
				<div className="home-top-container">
					<Video />
					<p className="fs-300 text-center">
						<p className="inline text-light">BeatShot</p> is a rhythm-based aim-trainer where your music
						sets the tempo for precision aiming challenges. Conquer engaging default game modes, craft
						custom game modes, and make aim-training less of a chore.
					</p>
					<SteamSteamPurchaseLink></SteamSteamPurchaseLink>
				</div>
				<div className="home-container">
					<h3 className="text-light text-center">Game Modes</h3>
					<div className="home-inner-container">
						<p>
							<b className="text-light fs-300">Default Game Modes</b>
						</p>
						<p>Default modes challenge your accuracy and reaction time through a range of scenarios.</p>
						<ul>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>BeatGrid:</b> Multiple reactivating targets spawned in a static, predefined grid
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>BeatTrack:</b> Multiple horizontally moving targets, damaged by hovering your
									crosshair over them
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>Cluster Beat:</b> Several targets spawned simultaneously in close proximity, each
									activated separately
								</p>
							</li>

							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>Charged BeatTrack:</b> Multiple horizontally and vertically moving targets,
									requiring multiple shots to destroy
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>MultiBeat:</b> Continuously spawning stationary targets
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>
									<b>SingleBeat:</b> One target active at a time, alternating spawn locations from
									center to edge
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>And more!</p>
							</li>
						</ul>
					</div>
					<div className="home-inner-container">
						<p>
							<b className="text-light fs-300">Custom Game Modes</b>
						</p>
						<p>
							Customize a game mode using a default mode template or a previously created custom mode.
							Preview the game mode in the menu as you edit. Import a custom mode from a friend, or export
							yours to them. Some example settings include:
						</p>
						<ul>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Damage required for deactivation</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Minimum and maximum target size, including dynamic target sizing</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Spawn area height/width, including dynamic spawn area height/width</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Spawn beat delay</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Target activation, deactivation, destruction conditions</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Target lifespan</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Target movement</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>Target spawn cooldown</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} />
								<p>40+ additional settings!</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="home-container">
					<h3 className="text-light text-center">Advanced Audio Analysis</h3>
					<div className="home-inner-container fs-200">
						<p>
							The audio analyzer keeps a rolling average of the frequency values across multiple channels.
							When it detects a change in frequency that is very different from the current rolling
							average, targets are spawned. The frequency channels (e.g. 0-87 Hz for a bass channel) and
							the sensitivity for each channel can be fine-tuned in the settings menu.
						</p>
					</div>
					<div className="home-inner-container fs-200">
						<p>
							When you provide the game with a song file, it analyzes a separate audio track from the one
							you actually hear. This offset allows the game to account for reaction time. Here&#39;s a
							short breakdown, using 0.25 seconds for reaction time:
						</p>
					</div>
					<div className="home-inner-container">
						<Image className="home-img" priority src={Timing} quality={100} alt="timing-example" />
					</div>
				</div>
				<div className="home-container">
					<h3 className="text-light text-center">Detailed Performance Statistics</h3>
					<div className="home-inner-container">
						<ul>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>
									<b>Overview:</b> Time played statistics and play frequency across all modes
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p className="fw-bold">Default Modes:</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										Score, accuracy, targets destroyed, completion, streak, reaction time, and
										location accuracy charts
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Filter by game mode, song, difficulty, and date range</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p className="fw-bold">Custom Modes:</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Score, accuracy, targets destroyed, completion, streak, reaction time, and
											location accuracy charts
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Filter by game mode, song, and date range</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>
									<b>History:</b> All saved score entries in table format
								</p>
							</li>
						</ul>
					</div>
					<div className="home-inner-container">
						<Image className="home-img" priority src={StatsPreview} quality={100} alt="stats-preview" />
					</div>
				</div>
				<div className="home-container">
					<h3 className="text-light text-center">Predictive Aim Training</h3>
					<div className="home-inner-container fs-200">
						<p>
							BeatShot leverages the power of reinforcement learning to dynamically predict target spawn
							locations tailored to your unique playstyle.
						</p>
					</div>
					<div className="home-inner-container fs-200">
						<p>
							Rather than basing the prediction model on accuracy across all spawn locations, it tracks
							accuracy from every spawn location to every other spawn location, creating a detailed map of
							your precision across the entire spawn area. The model adapts quickly to changes in
							performance, and can be customized further by tuning the parameters in the custom game modes
							menu.
						</p>
					</div>
					<div className="home-inner-container fs-200">
						<p>
							This is an <i>opt-in feature</i> for custom modes only to retain a consistent experience for
							default modes.
						</p>
					</div>
				</div>
				<div className="home-container">
					<h3 className="text-light text-center">Other Settings</h3>
					<div className="home-inner-container">
						<ul>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>Custom crosshair creator</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>Target color settings</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>Standard video/audio settings, including DLSS 3.5</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="text-light" />
								<p>Sensitivity based on two common competitive FPS games</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
