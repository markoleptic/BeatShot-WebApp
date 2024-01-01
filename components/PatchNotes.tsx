import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCrosshairs } from "@fortawesome/free-solid-svg-icons";

const PatchNotes = () => {
	return (
		<>
			<div className="flex-container-column gap-1rem padding-1rem">
				<h2 className="pn-title">Patch Notes</h2>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3906374309609856637?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.6.1
							</Link>
							<p className="pn-date">December 23, 2023</p>
						</div>
						<ul>
							<p className="fs-300"></p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">General</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Updated engine to Unreal Engine 5.3.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Updated various modules and plugins such as the audio analyzer, Enhanced
											User Input, etc.
										</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Custom keybindings are stored in a new way, but legacy saved
													keybindings should properly transfer over.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added an option to change the anti-aliasing method.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Changed the default anti-aliasing method to Temporal Super Resolution.</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Bug Fixes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug causing the reinforcement learning algorithm to access incorrect
											values of the QTable.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug causing invalid spawn areas to sometimes be chosen for
											activation.
										</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3747617344191398606?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.6.0
							</Link>
							<p className="pn-date">October 25, 2023</p>
						</div>
						<ul>
							<p className="fs-300">
								It&#39;s been a while since the last update, but there&#39;s quite a few changes in this
								one. All Default Game Modes have received a tuning pass, two &#34;new&#34; modes have
								been introduced, new custom mode options have been added, and various bug fixes and UI
								improvements have been made.
							</p>
							<p className="fs-300">
								Tuning game modes is challenging without much feedback, so we&#39;d really appreciate
								your thoughts. Your input is invaluable, and we hope you enjoy exploring the
								improvements!
							</p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											BeatTrack has been reworked. Instead of a single persistent target, multiple
											targets are spawned with infinite lifespans. Targets deactivate after taking
											50 damage, causing them to shrink in size and then reactivate. After a
											target takes 150 total damage, it is destroyed and a new one is spawned.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>ClusterBeat has been updated to use the new Spawn Selection setting.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a new Default Game Mode, MultiBeat Precision: Focuses on precision
											with a smaller, static spawn area, smaller targets, and a wider range of
											target sizes.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a new Default Game Mode, MultiBeat Speed: Emphasizes speed with a
											smaller, static spawn area, larger targets, more frequent spawning, and a
											narrower range of target sizes.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Tuned various parameters for all Default Game Modes and difficulties (mostly
											nerfs tbh).
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Location Accuracy now works for all game modes. Previously, game modes with
											Grid-based target distributions or Tracking-based damage did not record
											location accuracy data, so nothing showed up on the Location Accuracy
											Heatmap.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Massively improved the reinforcement learning algorithm and updated the
											tooltips for the parameters.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>The max allowed Target Lifespan has been increased to 10 seconds.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The min allowed Target Health has been lowered to 10 and the snap size
											reduced to 10.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Grid-based target distribution</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													The number of horizontal and vertical targets no longer have to be
													in increments of five for reinforcement learning to be enabled.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													The horizontal and vertical spread options are now disabled and
													automatically adjusted based on the number of targets, spacing, and
													target size.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Added a new menu option: Spawn Selection, which specifies the shape
													and location of targets including options like RandomGridBlock and
													BorderingGridBlock.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Targets spawned using RandomGridBlock or BorderingGridBlock will
													always be compactly arranged (e.g. 12 targets will be a 3x4 or 4x3
													block).
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a checkbox to the Target Lifespan menu option to allow for infinite
											lifespan.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new Deactivation Condition: OnSpecificHealthLost</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new Deactivation Response: Reactivate</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new menu option: Health Loss Required For Deactivation</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new menu option: Allow Activation While Activated</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new menu option: Spawn Responses</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Improved consistency of moving target velocity and direction after bouncing.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Improved the way multiple targets are spawned at once.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											When the Maximum Number of Activated Targets is set to -1, the game mode
											will now fall back to other constraints instead of defaulting to one.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where the Recent Target Memory Policy None would never remove
											targets from being recent.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where the reinforcement learning parameters were mixed up with
											what they actually represented.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where the custom game modes using tracking damage were not
											receiving the correct score.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">User Interface</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Dismissive actions (like cancel) are now always the leftmost button of any
											dialog box.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Clicking the Restart button from Post Game Mode Menu now shows the Audio
											Select dialog box instead of automatically using the same song.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The Game Mode Preview window now applies padding based on the target size,
											ensuring that targets no longer extend beyond the window boundaries.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added the ability to delete scores associated with a Custom Game Mode when
											clicking the Delete Selected button.{" "}
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a button to reset any reinforcement learning data for a Custom Game
											Mode.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a start button to the Custom Game Mode Creator View.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added a new Settings Menu option: Tracking Target Color</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a new Settings Menu option: Tracking Target Color While Taking Damage
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added and updated various tooltip descriptions.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Removed the Start Without Saving button. The game now prompts users based on
											the context when clicking the Start button.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Combined menu options that previously had a separate constant, min, and max
											option into one menu option.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Combined menu options with an infinite option into one menu option.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Moved all condition and response settings into one category: Responses</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Moved all direction or velocity related settings into one category: Movement
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Moved all target sizing related settings into one category: Target Sizing</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Shortened the names of various Custom Game Modes settings.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where changes to dynamic custom game mode settings were not
											detected, causing the game to suggest the custom game mode was already up to
											date.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where Custom Game Modes would still show up after clicking the
											Remove All button.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where changes to the Floor Distance were not properly updating
											the Game Mode Preview.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed a bug where very high Floor Distance values were pushing targets off
											the Game Mode Preview area.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Miscellaneous</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Fixed a bug where separate outline colors were not applying to targets.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3738607609083623504?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.6
							</Link>
							<p className="pn-date">September 27, 2023</p>
						</div>
						<ul>
							<p className="fs-300"></p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">CrossHair</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added the option to show a dot in the middle, along with the color and size.
											It inherits the outline settings.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Outline Width is now called Outline Size and it now scales independently of
											Line Width.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Video and Sound</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Fixed a bug where video quality settings were not correctly applying.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3737481075257137588?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.5
							</Link>
							<p className="pn-date">September 26, 2023</p>
						</div>
						<ul>
							<p className="fs-300"></p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Custom Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added new settings that allow tuning the Dynamic Bounds Scaling Policy</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>Start Threshold</b>: The number of consecutively destroyed
													targets required to begin increasing the min spread to the max
													spread.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>End Threshold</b>: The number of consecutively destroyed targets
													required to reach the max spread.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>
														Min Horizontal Spread, Min Vertical Spread, and Min Forward
														Spread
													</b>
													: the size of the spawn area before the Start Threshold is reached.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>Decrement Amount</b>: Instead of resetting consecutively
													destroyed targets to zero each time a target is missed, this value
													is subtracted from it.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added new settings that allow tuning the Skill-Based Consecutive Target
											Scaling Policy:
										</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>Start Threshold</b>: The number of consecutively destroyed
													targets required to begin decreasing the max target scale to the min
													target scale.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>End Threshold</b>: The number of consecutively destroyed targets
													required to reach the min target scale.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													<b>Decrement Amount</b>: Instead of resetting consecutively
													destroyed targets to zero each time a target is missed, this value
													is subtracted from it.
												</p>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Default Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Updated Single Beat and Multi Beat with the new settings discussed above.</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">User Interface</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Adjusted the scale and text size of various elements.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added tags beside some Custom Game Modes settings to help identify them
											quicker.
										</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													In the future, I would like to add a search function that works with
													these tags.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											To prevent excessive tag usage, I did not tag each menu option with its
											category tag (i.e. tagging every menu option in Deactivation with the
											Deactivation Tag).
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Miscellaneous</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Fixed feedback/bug report sending.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/6135647336837560306?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.4
							</Link>
							<p className="pn-date">September 17, 2023</p>
						</div>
						<ul>
							<p className="fs-300"></p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Animation</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Smoothed out the recoil animation.</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Custom Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target Scale</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Now shows a warning tooltip indicating the maximum allowed scale
													when the TargetDistributionPolicy is Grid and there it not enough
													room for targets in the Spawn Area.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Forward Distance</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Now shows a warning tooltip if the Moving Target Dirction Mode is
													Forward Only and one or more settings want to move the target.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added caution and warning counters above each custom game mode category.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Game modes with targets that are never destroyed (Target Destruction
											Condition is Persistant):
										</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>When target health falls to zero, health is reset to Max Health.</p>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Default Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Charged Beat Track and Cluster Beat</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Changed Recent Target Memory Policy from Use TargetSpawnCD to Num
													Targets Based.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Changed Max Num Recent Targets from -1 to 3, 4, or 5 (based on
													difficulty).
												</p>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Effects</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed an issue where the tracer and muzzle flash systems were not attached
											to the gun&#39;s muzzle, causing desync during animation or recoil.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Settings</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added HDR settings.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added Brightness slider (only affects in-game brightness and not UI
											brightness).
										</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3678932376665208608?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.3
							</Link>
							<p className="pn-date">August 31, 2023</p>
						</div>
						<ul>
							<p className="fs-300">
								This update enables players to preview game modes while editing them, modifies some
								custom game modes options, and adjusts lighting for different scenarios.
							</p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Custom Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a new window to the Custom Game Modes Menu: <b>Creator View</b>
										</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													The top half shows a preview of the currently selected game mode
													with all features you see while playing (besides forward movement).
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													The bottom half contains carousel which shows one custom game mode
													category at a time.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Make a change to any setting and quickly see the result by pressing
													the <i>Refresh Preview</i> button.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Every target in the preview is damaged during its activation window
													if possible.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													The old Custom Game Modes Menu is still available, and is now called{" "}
													<b>Property View</b>.
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Changing default game modes and difficulties in the Default Game Mode Menu
											no longer changes the Custom Game Mode options. It now requires pressing the{" "}
											<i>Customize Selected</i> button.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Combined the <b>Game Mode Name</b> and <b>Base Game Mode</b> combo boxes
											into <b>Game Mode Template</b>.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added new Spawning option: <b>Apply Velocity On Spawn</b>
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added new General option: <b>Infinite Health</b>
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Replaced the <i>Save and Start</i> button with the <i>Start</i> button. It
											will still prompt you asking if you wish to overwrite, but only if
											you&#39;ve made any changes to the custom game mode you&#39;ve selected.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Replaced the <b>Lifetime Target Scaling Policy</b> option with the Target
											Activation Response: <b>Apply Lifetime Target Scaling</b>.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Replaced the <b>Move Targets Forward</b> option with the Moving Target
											Direction Mode: <b>Forward Only</b>.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Renamed the <b>Move Forward Distance</b> option to <b>Forward Spread</b>.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The Target Activation/Deactivation Response: Change Direction is no longer
											explicitly required for velocity changing to have an effect.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target Activation Responses:</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Added: <b>Apply Consecutive Target Scale</b>,{" "}
													<b>Apply Lifetime Target Scaling</b>
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Removed: <b>Change Scale</b>
												</p>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target Deactivation Responses:</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Added: <b>Apply Deactivated Target Scale Multiplier</b>,{" "}
													<b>Reset Scale To Activated Scale</b>,{" "}
													<b>Reset Position To Activated Position</b>
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>Renamed: </p>
												<ul>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>
															<b>Reset Position</b> is now{" "}
															<b>Reset Position To Spawned Position</b>.
														</p>
													</li>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>
															<b>Reset Scale</b> is now{" "}
															<b>Reset Scale To Spawned Scale</b>.
														</p>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Moving Target Direction Mode:</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Horizontal Only now forces targets to only move horizontally after
													bounces.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Vertical Only now forces targets to only move vertically after
													bounces.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Alternate Horizontal Vertical now forces targets to only move
													horizontally or vertically after bounces. Now alternates the
													starting direction between target spawns. Each subsequent activation
													of a target will also alternate, starting from the direction they
													spawned with.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													A warning now appears if None is selected and any of the following
													options:
												</p>
												<ul>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>Apply Velocity On Spawn</p>
													</li>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>
															Target Activation Response: Change Velocity or Change
															Direction
														</p>
													</li>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>
															Target Deactivation Response: Change Velocity or Change
															Direction
														</p>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Target Distribution Policy:</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													A warning now appears if Headshot Height Only is selected and AI is
													enabled.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													When Grid is selected, the following options are now set to
													read-only and their values changed:
												</p>
												<ul>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>
															The Horizontal Spread and Vertical Spread are set to their
															max values.
														</p>
													</li>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>The Bounds Scaling Policy is set to Static.</p>
													</li>
													<li className="pn-dev-note">
														<p className="pn-dev-note">
															<i>
																Since these settings have no effect on Grid, it makes
																sense to relay that information to the player. However,
																Grid will likely support Bounds Scaling Policy in the
																future.
															</i>
														</p>
													</li>
												</ul>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>When Grid is NOT selected, the following options are hidden:</p>
												<ul>
													<li>
														<FontAwesomeIcon icon={faPlay} />
														<p>Target Activation Selection Policy</p>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Updated many tooltips.</p>
									</li>
									<li className="pn-dev-note">
										<p>
											<i>
												The goal with these changes is to give players more flexibility when
												changing the position, velocity, and scale of targets at different
												points in their life cycle.
											</i>
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">FAQ</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Updated the Game Modes section.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added content to the Audio Analyzer section.</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Lighting</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The spotlights on the ceiling have been replaced with a rectangular light
											provides better lighting coverage when in night mode.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											A spotlight has been added that lights up the spawn area when in night mode.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The brightness when playing on low global illumination settings now better
											matches the brightness when playing on other quality levels.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Video Settings</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Fixed an issue where the resolution scale was showing infinite values.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/7132065582070409439?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.2
							</Link>
							<p className="pn-date">August 13, 2023</p>
						</div>
						<ul>
							<p className="fs-300">
								This update enables custom game mode sharing, adds visual hit timing feedback, and
								addresses some video settings bugs.
							</p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Custom Game Modes</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Custom game modes can now be imported and exported.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Added new Target Deactivation Response: Hide Target</p>
										<ul>
											<p></p>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>Hides the target upon deactivation.</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>Useful for game modes that spawn all targets upfront.</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>
													Still shows all spawned targets during countdown, but hides them
													once the game mode starts.
												</p>
											</li>
											<li>
												<FontAwesomeIcon icon={faPlay} />
												<p>Example use: Hiding inactive targets during Beat-Grid.</p>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">User Interface</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Added a hit timing overlay to the player HUD. It&#39;s enabled by default
											but can be turned off in the game settings menu.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Video Settings</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed an issue where DLSS settings were not properly initializing for
											graphics cards not supported by DLSS.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Fixed an issue where DLSS Super Resolution Auto Mode was not correctly
											finding the optimal DLSS settings.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>Improved DLSS Setting functionality.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="centered-bordered-container-1000">
					<div className="pn-container">
						<div className="pn-version-date">
							<Link
								className="link hover-blue fw-semibold pn-version-number"
								href="https://store.steampowered.com/news/app/2126580/view/3671048540133749972?utm_source=beatshotwebsite&utm_medium=web"
							>
								0.5.1
							</Link>
							<p className="pn-date">August 4, 2023</p>
						</div>
						<ul>
							<p className="fs-300">
								This is a small update, but it improves the gun viewmodel and animations, which is
								constantly in your field of view.
							</p>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">Animation</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>New gun animations for idling, strafing, and landing after jumping.</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											Removed the jump start and falling gun animations. They felt unnecessary in
											my opinion.
										</p>
									</li>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The old animations were relying on IK bone updates on tick using animations
											created for a different weapon. You could tell the left hand on the
											handguard was not perfectly synced. The new ones should look much cleaner
											since they&#39;re custom made for gun and require no IK bone updates.
										</p>
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
								<p className="fs-300">User Interface</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faPlay} />
										<p>
											The audio file select window no longer requires breaking out of Fullscreen
											mode.
										</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
export default PatchNotes;
