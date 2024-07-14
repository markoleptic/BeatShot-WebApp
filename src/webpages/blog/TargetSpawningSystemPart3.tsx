"use client";

import React, { useRef } from "react";
import useOnScreen from "@/hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "@/components/SidebarHashLink";
import { BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import image_BoxBounds from "public/BoxBounds.png";
import image_ClusterBeat from "public/ClusterBeat.png";
import image_TotalSpawnArea from "public/TotalSpawnArea.png";
import image_Hero from "public/SpawnMemory_Hero_Cropped.png";
import image_SphereColorGradient from "public/SphereColorGradient.png";
import image_BeatGrid from "public/BeatGrid.png";
import image_NonBeatGrid from "public/NonBeatGrid.png";
import image_GridBlockSpawning from "public/GridBlockSpawning.png";
import image_ClusterBeatLog1 from "public/ClusterBeatExampleLog1.png";
import image_ClusterBeatLog2 from "public/ClusterBeatExampleLog2.png";
import image_ClusterBeatLog3 from "public/ClusterBeatExampleLog3.png";
import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";
import ImageCarousel from "@/components/ImageCarousel";

const titleShort = "BeatShot's Target Spawning System: Part 3 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 3";
const description = "TODO";

const TargetSpawningSystemPart3 = () => {
	const Ref_States = useRef(null);
	const Ref_TargetStates = useRef(null);
	const Ref_SpawnAreaStates = useRef(null);
	const Ref_ConditionsAndResponses = useRef(null);
	const Ref_Conditions = useRef(null);
	const Ref_Responses = useRef(null);
	const Ref_TargetDistributionPolicy = useRef(null);
	const Ref_Conclusion = useRef(null);

	const onScreen_States = useOnScreen(Ref_States);
	const onScreen_TargetStates = useOnScreen(Ref_TargetStates);
	const onScreen_SpawnAreaStates = useOnScreen(Ref_SpawnAreaStates);
	const onScreen_ConditionsAndResponses = useOnScreen(Ref_ConditionsAndResponses);
	const onScreen_Conditions = useOnScreen(Ref_Conditions);
	const onScreen_Responses = useOnScreen(Ref_Responses);
	const onScreen_TargetDistributionPolicy = useOnScreen(Ref_TargetDistributionPolicy);

	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#states`} onScreen={onScreen_States} topLevelLink={true}>
						States
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#states-target`}
								onScreen={onScreen_States && onScreen_TargetStates}
							>
								Target States
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#states-spawn-area`}
								onScreen={onScreen_States && !onScreen_TargetStates && onScreen_SpawnAreaStates}
							>
								Spawn Area States
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conditions-and-responses`}
						onScreen={!onScreen_States && onScreen_ConditionsAndResponses}
						topLevelLink={true}
					>
						Conditions and Responses
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#conditions`}
								onScreen={!onScreen_States && onScreen_ConditionsAndResponses && onScreen_Conditions}
							>
								Conditions
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#responses`}
								onScreen={
									!onScreen_States &&
									onScreen_ConditionsAndResponses &&
									!onScreen_Conditions &&
									onScreen_Responses
								}
							>
								Responses
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#target-distribution`}
						onScreen={!onScreen_ConditionsAndResponses && onScreen_TargetDistributionPolicy}
						topLevelLink={true}
					>
						Target Distribution
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={!onScreen_TargetDistributionPolicy && onScreen_Conclusion}
						topLevelLink={true}
					>
						Conclusion
					</SidebarHashLink>
				</li>
			</ul>
		</Sidebar>
	);

	return (
		<div className="flex-container-column">
			<div className="hero-container">
				<div className="hero">
					<h1>{titleLong}</h1>
					<p className="hero-lead">{description}</p>
					<Image className="hero-image" priority src={image_Hero} quality={100} alt="logo" />
				</div>
			</div>
			<div className="flex-container-row">
				{sideBar}
				<article className="devblog-article flex-container-column" id="article">
					<div className="article-section" ref={Ref_States} id="states">
						<BlogHeading headingText="States" headingLevel={1} />
						<div className="article-subsection" ref={Ref_TargetStates} id="states-target">
							<BlogHeading headingText="Targets States" headingLevel={2} />
							<ul>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<b>Activated</b>: target is damageable by the player and can be a variety of colors
									based on the current position in its lifetime
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<span className="text-purple">
										<b>Deactivated</b>
									</span>
									: not damageable by the player, shown as purple in Figure TODO
								</li>
							</ul>
							<figure>
								<div className="figure-border-container">
									<Image src={image_SphereColorGradient} alt="BoxBounds" />
									<figcaption>
										<p className="figlabel">Figure TODO: </p>
										Activated target colors
									</figcaption>
								</div>
							</figure>
						</div>
						<div className="article-subsection" ref={Ref_SpawnAreaStates} id="states-spawn-area">
							<BlogHeading headingText="Spawn Area States" headingLevel={2} />
							<div className="article-section-row">
								<div className="div-50" id="">
									<p>
										Spawn Areas are essentially glorified data containers. The Target Manager
										notifies the Spawn Area Manager when targets are spawned, damaged, and/or change
										state. The Spawn Area Manager updates the state of Spawn Areas based on the
										information it receives from the Target Manager.
									</p>
									<p>
										Spawn Areas have more states than targets since they also keep track of where
										targets have been previously.
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<b>Managed</b>: mapped to a spawned target, can either be activated or
											deactivated. All visible targets are managed.
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													<span className="text-green">
														<b>Activated</b>
													</span>
													: mapped target is activated, shown as green squares in Figure TODO
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													<span className="text-red">Deactivated</span>: mapped target is
													deactivated, shown as red squares in Figure TODO
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<span className="text-light">
												<b>Recent</b>
											</span>
											: does not reference a target, not valid to spawn or activate, shown as
											light blue squares in Figure TODO
										</li>
									</ul>
								</div>
								<div className="div-50">
									<figure>
										<div className="figure-border-container">
											<Image
												className=" max-height-400"
												src={image_ClusterBeat}
												alt="BoxBounds"
											/>
											<figcaption>
												<p className="figlabel">Figure TODO: </p>
												TODO
											</figcaption>
										</div>
									</figure>
								</div>
							</div>
						</div>
					</div>
					<div className="article-section" ref={Ref_ConditionsAndResponses} id="conditions-and-responses">
						<BlogHeading headingText="Conditions and Responses" headingLevel={1} />
						<p>Target behavior is manipulated using conditions and responses.</p>
						<div className="article-subsection" ref={Ref_Conditions} id="conditions">
							<BlogHeading headingText="Conditions" headingLevel={2} />
							<ul>
								<p>Conditions dictate how long a target is relevant for and come in two forms:</p>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>ETargetDeactivationCondition</BSInlineEnum>: event that triggers a
									target to transition from <BSInlineEnum>::Activated</BSInlineEnum> to{" "}
									<BSInlineEnum>::Deactivated</BSInlineEnum>
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>ETargetDestructionCondition</BSInlineEnum>: event that immediately
									causes the target to be destoyed by the Target Manager regardless of its current
									state
								</li>
							</ul>
							<p>
								If multiple conditions are specified, the condition that occurs first will trigger the
								deactivation/destruction.
							</p>
							<div className="article-subsection-2" id="">
								<BlogHeading headingText="Examples" headingLevel={3} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>::OnSpecificHealthLoss</BSInlineEnum> as the only deactivation
										condition:
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<b>Health Loss Required for Deactivation</b> = 100,{" "}
												<b>Maximum Target Health</b> = 300
												<ul>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														If <BSInlineEnum>::OnHealthReachedZero</BSInlineEnum> is the
														only target destruction condition, targets are deactivated when
														reaching 200, 100, and 0 health
													</li>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														If <BSInlineEnum>::OnSpecificHealthLost</BSInlineEnum> and{" "}
														<BSInlineEnum>::OnExpiration</BSInlineEnum> are target
														destruction conditions, targets are deactivated when reaching
														200, 100, and 0 health when damaged by the player, but will be
														immediately destroyed if the player does not damage the target
														while activated
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>::OnAnyExternalDamageTaken</BSInlineEnum> and{" "}
										<BSInlineEnum>::OnExpiration</BSInlineEnum> as deactivation conditions:
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												Targets are deactivated when damaged by the player or when their maximum
												lifespan expires, whichever comes first
											</li>
										</ul>
									</li>
								</ul>
							</div>
							<p>
								By combining both deactivation and destruction conditions, it becomes possible for a
								target to be reactivated numerous times if the player is able to damage it, while also
								immediately destroying it the first time they are not able to damage it while activated.
							</p>
						</div>
						<div className="article-subsection" ref={Ref_Responses} id="responses">
							<BlogHeading headingText="Responses" headingLevel={2} />
							<p>Responses specify what the target does when it reaches a certain state.</p>
							<ul>
								<p>There are three kinds of responses:</p>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>ETargetSpawnResponse</BSInlineEnum>: modification to apply to a target
									when spawned. Always applied and only happens once in a target&#39;s lifetime.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>ETargetActivationResponse</BSInlineEnum>: modification to apply to a
									target when activated. No restriction on how many times this may happen in a
									target&#39;s lifetime.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>ETargetDeactivationResponse</BSInlineEnum>: modification to apply to a
									target when deactivated. No restriction on how many times this may happen in a
									target&#39;s lifetime.
								</li>
							</ul>
							<p>
								Responses at each state in a target&#39;s lifecycle allow for modifications like target
								movement and target size changes to be applied only when activated, only when
								deactivated, both, or neither.
							</p>
							<p>When a target is destroyed, deactivation responses are always applied.</p>
						</div>
					</div>
					<div className="article-section" ref={Ref_TargetDistributionPolicy} id="target-distribution">
						<BlogHeading headingText="Target Distribution Policy" headingLevel={1} />
						<p>
							The Target Distribution Policy determines how targets are distributed within individual
							Spawn Areas. A target does not need to fit inside the Spawn Area it is associated with.
						</p>
						<div className="article-subsection" id="">
							<div className="article-section-row">
								<div className="div-50">
									<BlogHeading headingText="Full-range" headingLevel={2} />
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Targets can spawn anywhere within the Spawn Area
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Spawn area size is always 50x50
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													This is mostly because 50x50 covers the smallest possible target
													size option
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Since the spatial grid has fixed maximum dimensions and increment values,
											there will only ever be a maximum of 1280 Spawn Areas.
										</li>
									</ul>
								</div>
								<div className="div-50">
									<BlogHeading headingText="Grid-based" headingLevel={2} />
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Targets always spawn at bottom left vertex of Spawn Area
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Spawn Area size based on the number of targets, target size, and grid
											spacing
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Grid-based is a subset of Full-range, limited to one position within a Spawn
											Area.
										</li>
									</ul>
								</div>
							</div>
							<div className="article-section-row">
								<div className="div-50">
									<figure>
										<div className="figure-border-container">
											<Image src={image_NonBeatGrid} alt="BoxBounds" />
											<figcaption>Full-range (Spawn Area size: 50x50)</figcaption>
										</div>
									</figure>
								</div>
								<div className="div-50">
									<figure>
										<div className="figure-border-container">
											<Image src={image_BeatGrid} alt="BoxBounds" />
											<figcaption>Grid-Based (Spawn Area size: 145x145)</figcaption>
										</div>
									</figure>
								</div>
							</div>
						</div>
					</div>
					<div className="article-section" id="">
						<BlogHeading headingText="Spawn Selection Mode" headingLevel={1} />
						<ul>
							<p>
								The Spawn Selection setting determines where to spawn the targets for game modes that
								have a <BSInlineEnum>::Grid</BSInlineEnum> Target Distribution Policy of and a{" "}
								<BSInlineEnum>::RuntimeOnly</BSInlineEnum> Target Spawning Policy. There are currently
								four implemented modes:
							</p>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::Random</BSInlineEnum>: Randomly chooses an available SpawnArea
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::Bordering</BSInlineEnum>: Chooses a random bordering SpawnArea based on
								the last SPAWNED target
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::RandomGridBlock</BSInlineEnum>: Chooses a random block of targets
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::NearbyGridBlock</BSInlineEnum>: Chooses a nearby block of targets based
								on the last SPAWNED target
							</li>
						</ul>
						<p>
							Batch spawning is a setting that causes targets to only spawn when there no more managed
							targets are left to activate. Batch spawning in combination with a{" "}
							<BSInlineEnum>::RandomGridBlock</BSInlineEnum> or{" "}
							<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> creates a synergistic interaction used to
							create the ClusterBeat game mode, shown below in Figure TODO.
						</p>
						<figure>
							<div className="figure-border-container">
								<Image src={image_GridBlockSpawning} alt="TotalSpawnArea" />
								<figcaption>
									<p className="figlabel">Figure TODO: </p>
									ClusterBeat game mode with 25 targets spawned at a time using{" "}
									<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> and batch spawning
								</figcaption>
							</div>
						</figure>
						<p>
							When implementing the spawn selection modes, I created a console command to console log a
							matrix visualizing Spawn Area states. The numbers correspond to each Spawn Area index and
							indicate a valid spawn location, while underscores indicates that the Spawn Area was not a
							valid spawn location. Figure TODO shows the console output corresponding to Figure TODO.
						</p>
						<figure>
							<div className="figure-border-container">
								<Image src={image_ClusterBeatLog1} alt="TotalSpawnArea" />
								<figcaption>
									<p className="figlabel">Figure TODO: </p>
									Console output showing Spawn Area indices and recent Spawn Area locations for
									Grid-based game modes.
								</figcaption>
							</div>
						</figure>
						<p>
							The light-blue dashed rectangles are where the two previous grid blocks spawned, and each
							Spawn Area in these rectangles are flagged as recent. The green dashed rectangle is the
							largest rectangle found.
						</p>
						<ul>
							<p>
								<BSInlineEnum>::RandomGridBlock</BSInlineEnum> and{" "}
								<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> attempt to spawn groups of targets in the
								most compact arrangement possible using the following procedure:
							</p>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								All possible dimensions for the grid block are computed. Using the figures above, groups
								of 25 targets are spawned, so their dimensions, or factors, are:
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />5 and 5
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />1 and 25
									</li>
								</ul>
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />A modified version of the
								Largest Rectangle in a Histogram algorithm is used to identify rectangles that can
								accommodate any of the grid block dimensions found earlier.
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								After the rectangles have been obtained, one that can fit a grid block with dimensions
								that have the smallest differences between them is chosen. This heuristic ensures the
								most compact arrangement.
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								Once the rectangle has been chosen, the location and orientation of the grid block
								within the rectangle is chosen. For <BSInlineEnum>::NearbyGridBlock</BSInlineEnum>, it
								will attempt to choose a location that borders a recent Spawn Area.
							</li>
						</ul>
						<p>
							Figures TODO.1 and TODO.2 illustrates that sometimes the absolute largest rectangle does not
							accommodate the desired target formation. The first image shows that the rectangle could
							only fit a 1x25 grid block. The second image shows why multiple rectangles are considered,
							prioritizing rectangles that can fit more compact grid blocks.
						</p>
						<ImageCarousel
							images={[
								{
									image: image_ClusterBeatLog2,
									figNumber: 0.1,
									caption: "The largest valid rectangle of the total spawn area.",
									alt: "TODO",
									buttonText: "Largest",
								},
								{
									image: image_ClusterBeatLog3,
									figNumber: 0.2,
									caption: "The largest rectangles that can fit a 5x5 grid block.",
									alt: "TODO",
									buttonText: "Optimal",
								},
							]}
						/>
					</div>
					<div className="article-section" id="">
						<BlogHeading headingText="Spawn Area Sizing" headingLevel={1} />
						<ul>
							<p>
								The Bounds Scaling Policy determines how to change the total spawn area size throughout
								the game mode. There are two types:
							</p>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::Static</BSInlineEnum>: the total spawn area size does not change
							</li>
							<li>
								<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
								<BSInlineEnum>::Dynamic</BSInlineEnum>: the total spawn area size shrinks based on the
								number of targets consecutively hit
							</li>
						</ul>
						<p>
							If the Bounds Scaling Policy is <BSInlineEnum>::Dynamic</BSInlineEnum>, the Target Manager
							interpolates the current size of the total spawn area between the minimum spread and maximum
							spread for each direction (Horizontal, Vertical, and Forward). The spread is calculated
							using the current consecutively hit targets, the Start Threshold, and the End Threshold. The
							spread value is then rounded down to the nearest multiple of a Spawn Area, and the Spawn
							Area Manager updates the state of the Spawn Areas that are within the current total spawn
							area. The red Spawn Areas shown in Figure TODO are Spawn Areas that are outside of the
							current total spawn area.
						</p>
						<figure>
							<div className="figure-border-container">
								<Image src={image_TotalSpawnArea} alt="TotalSpawnArea" />
								<figcaption>
									<p className="figlabel">Figure TODO: </p>
									Individual Spawn Areas making up the total spawn area
								</figcaption>
							</div>
						</figure>
					</div>
				</article>
			</div>
		</div>
	);
};

export { TargetSpawningSystemPart3, titleShort, titleLong, description };
