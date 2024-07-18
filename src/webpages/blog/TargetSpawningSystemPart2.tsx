"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import {
	ActivateTarget,
	EGridIndexType,
	FindNextTargetProperties,
	GetValidSpawnLocations,
	HandleDeactivation,
	OnAudioAnalyzerBeat,
	RemovingOverlappingSpawnLocations,
	SpawnTarget,
} from "@/components/blog/TargetSpawningSystemFunctions";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import { BSCodeBlock, BSInlineCode, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { MultiImageCarousel } from "@/components/ImageCarousel";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";
import { BlogPostData } from "@/types/blog.types";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import image_Execution1 from "public/targetSpawningSystem/execution/Execution1.png";
import image_Execution10 from "public/targetSpawningSystem/execution/Execution10.png";
import image_Execution11 from "public/targetSpawningSystem/execution/Execution11.png";
import image_Execution12 from "public/targetSpawningSystem/execution/Execution12.png";
import image_Execution13 from "public/targetSpawningSystem/execution/Execution13.png";
import image_Execution14 from "public/targetSpawningSystem/execution/Execution14.png";
import image_Execution15 from "public/targetSpawningSystem/execution/Execution15.png";
import image_Execution16 from "public/targetSpawningSystem/execution/Execution16.png";
import image_Execution17 from "public/targetSpawningSystem/execution/Execution17.png";
import image_Execution18 from "public/targetSpawningSystem/execution/Execution18.png";
import image_Execution19 from "public/targetSpawningSystem/execution/Execution19.png";
import image_Execution2 from "public/targetSpawningSystem/execution/Execution2.png";
import image_Execution20 from "public/targetSpawningSystem/execution/Execution20.png";
import image_Execution21 from "public/targetSpawningSystem/execution/Execution21.png";
import image_Execution3 from "public/targetSpawningSystem/execution/Execution3.png";
import image_Execution4 from "public/targetSpawningSystem/execution/Execution4.png";
import image_Execution5 from "public/targetSpawningSystem/execution/Execution5.png";
import image_Execution6 from "public/targetSpawningSystem/execution/Execution6.png";
import image_Execution7 from "public/targetSpawningSystem/execution/Execution7.png";
import image_Execution8 from "public/targetSpawningSystem/execution/Execution8.png";
import image_Execution9 from "public/targetSpawningSystem/execution/Execution9.png";
import image_OverlappingVerts from "public/targetSpawningSystem/OverlappingVerts.png";
import image_SpawnMemory_Dynamic_FewRecent from "public/targetSpawningSystem/SpawnMemory_Dynamic_FewRecent.png";
import image_SpawnMemory_Dynamic_ManyRecent from "public/targetSpawningSystem/SpawnMemory_Dynamic_ManyRecent.png";
import image_Hero from "public/targetSpawningSystem/SpawnMemory_Hero_Cropped.png";
import image_Card from "public/targetSpawningSystem/TargetSpawningSystemCard.png";

const titleShort = "BeatShot's Target Spawning System: Part 2 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 2 - Target Lifecycle";
const description =
	"In this second part of the series, you'll learn how the core systems from Part 1 work together. I walk through " +
	"the lifecycle of targets, outlining the key functions and their roles. I also discuss some challenging problems " +
	"I encountered and how I solved them.";
const postDate: DateTime = DateTime.fromFormat("July 14, 2024", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 14, 2024", "DDD");

const TargetSpawningSystemPart2 = () => {
	const Ref_TargetLifeCycle = useRef(null);
	const Ref_Initialization = useRef(null);
	const Ref_Spawning = useRef(null);
	const Ref_Activation = useRef(null);
	const Ref_Deactivation = useRef(null);
	const Ref_Destruction = useRef(null);
	const Ref_Conclusion = useRef(null);

	const onScreen_TargetLifeCycle = useOnScreen(Ref_TargetLifeCycle);
	const onScreen_Initialization = useOnScreen(Ref_Initialization);
	const onScreen_Spawning = useOnScreen(Ref_Spawning);
	const onScreen_Activation = useOnScreen(Ref_Activation);
	const onScreen_Deactivation = useOnScreen(Ref_Deactivation);
	const onScreen_Destruction = useOnScreen(Ref_Destruction);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#target-lifecycle`} onScreen={onScreen_TargetLifeCycle} topLevelLink={true}>
						Target Lifecycle
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Initialization`}
								onScreen={onScreen_TargetLifeCycle && onScreen_Initialization}
							>
								Initialization
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Spawning`}
								onScreen={onScreen_TargetLifeCycle && !onScreen_Initialization && onScreen_Spawning}
							>
								Spawning
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Activation`}
								onScreen={
									onScreen_TargetLifeCycle &&
									!onScreen_Initialization &&
									!onScreen_Spawning &&
									onScreen_Activation
								}
							>
								Activation
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Deactivation`}
								onScreen={
									onScreen_TargetLifeCycle &&
									!onScreen_Initialization &&
									!onScreen_Spawning &&
									!onScreen_Activation &&
									onScreen_Deactivation
								}
							>
								Deactivation
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Destruction`}
								onScreen={
									onScreen_TargetLifeCycle &&
									!onScreen_Initialization &&
									!onScreen_Spawning &&
									!onScreen_Activation &&
									!onScreen_Deactivation &&
									onScreen_Destruction
								}
							>
								Destruction
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={!onScreen_TargetLifeCycle && onScreen_Conclusion}
						topLevelLink={true}
					>
						Conclusion
					</SidebarHashLink>
				</li>
			</ul>
		</Sidebar>
	);

	return (
		<>
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
						<p>
							I wrote this article with the goal that the reader doesn&#39;t need to understand C++ to
							grasp the main concepts that BeatShot uses in its target spawning system. The code blocks
							are supplementary and I follow a general pattern when inserting them: introduce the function
							and context, insert code block, describe what&#39;s happening in the code block.
						</p>
						<div className="article-section" ref={Ref_TargetLifeCycle} id="target-lifecycle">
							<BlogHeading headingText="Target Lifecycle" headingLevel={1} />
							<p>
								Every target goes through the same lifecycle of spawning, activation, deactivation, and
								destruction. Before discussing those events, I&#39;ll describe the initialization
								process that the involved actors go through.
							</p>
							<div
								className="article-subsection"
								ref={Ref_Initialization}
								id="target-lifecycle-Initialization"
							>
								<BlogHeading headingText="Initialization" headingLevel={2} />
								<p>
									When you first load into the map, the game mode spawns the Target Manager and passes
									the game mode configuration to it. The Target Manager then determines the minimum
									and maximum size of the total spawn area and sets the dimensions of all box
									components to appropriate values. Next, each component of the Targe Manager is
									initialized.
								</p>
								<p>
									The Spawn Area Manager determines the dimensions of all Spawn Areas using the
									maximum size of the total spawn area. Then, it creates and initializes all Spawn
									Areas for the game mode.
								</p>
								<p>
									When a Spawn Area is created, it determines its{" "}
									<BSInlineEnum>EGridIndexType</BSInlineEnum> based on the location and index it
									received from the Spawn Area Manager. Using this, it stores the direction and index
									of all adjacent Spawn Areas in a map which are primarily used in Grid-based game
									modes
								</p>
								<BSCodeBlock>{EGridIndexType}</BSCodeBlock>
							</div>
							<div className="article-subsection" ref={Ref_Spawning} id="target-lifecycle-Spawning">
								<BlogHeading headingText="Spawning" headingLevel={2} />
								<ul>
									<p>There are two spawning methods in BeatShot:</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>::UpfrontOnly</BSInlineEnum>: Spawns all targets inside{" "}
										<BSInlineFunction>ATargetManager::Init</BSInlineFunction>. No other targets are
										spawned for the duration of the game mode.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>::RuntimeOnly</BSInlineEnum>: Spawns targets based on beat
										thresholds being met by the audio analyzer, which triggers the game mode to call{" "}
										<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction> on the Target{" "}
										Manager.
									</li>
								</ul>
								<p>
									The first function <BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>{" "}
									calls is <BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>. Here, the
									Target Manager determines how many targets to spawn. It ensures it only spawns
									targets that can be activated, unless the game mode allows spawning without
									activation. If three targets are currently activated, and the{" "}
									<em>Maximum Number of Activated Targets at Once</em> is set to four, only one target
									will be spawned regardless of the Number of Runtime Targets to Spawn.
								</p>
								<p>
									At the end of <BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>, the size
									of the total spawn area is updated, and the size of the targets to spawn are
									determined using a curve table lookup if dynamic, or randomly selected if random.
									Finally, the Target Manager retrieves a set of{" "}
									<BSInlineFunction>FTargetSpawnParams</BSInlineFunction> from the Spawn Area Manager
									by calling <BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction>, where the
									number of targets to spawn and an array of target sizes are passed to the function.
								</p>
								<p>
									<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is the heart of spawn
									location decision making, and a lot is involved. The{" "}
									<em>Target Distribution Policy</em> dictates which series of functions are executed.
								</p>
								{/* <figure>
									<div className="figure-border-container">
										<Image src={image_OverlappingVerts} alt="OverlappingVerts" />
										<figcaption>
											<p className="figlabel">Figure TODO: </p>
											Overlapping Vertices generated after each target was flagged as Managed.
										</figcaption>
									</div>
								</figure> */}
								<ol>
									<li>
										The set of Spawn Areas that fall within the current total spawn area are
										considered candidates for spawning.
									</li>
									<li>
										Spawn Areas that are managed, activated, or recent need to be removed from the
										candidates. Each time a Spawn Area is chosen, it needs to be removed from the
										candidates as well.
									</li>
									<li>
										The main loop iterates over the number of targets to spawn. At each iteration, a
										copy of the Spawn Area candidates is made, and{" "}
										<BSInlineFunction>::RemoveOverlappingSpawnAreas</BSInlineFunction> is called to
										modify the Spawn Area candidates copy. It removes any managed, activated, or
										recent Spawn Areas from the candidate set, as well as any adjacent Spawn Areas
										where the target overlapped. A sphere trace is performed to find the adjacent
										Spawn Areas that should also be removed from due to the target overlapping.
									</li>
									<li>
										<BSInlineFunction>::ChooseSpawnableSpawnAreas</BSInlineFunction> is called with
										the modified candidate set along and a set of Spawn Areas that have been chosen
										during iteration. This function determines which Spawn Area to choose using a
										priority list based on game mode settings:
										<ol>
											<li>
												<em>Spawn Every Other Target In Center</em>
											</li>
											<li>
												<em>Spawn At Origin Whenever Possible</em>
											</li>
											<li>
												If the game mode uses AI, it will request a Spawn Area from the
												Reinforcement Learning Component
											</li>
											<li>Choosing a random Spawn Area from the candidates.</li>
										</ol>
									</li>
									<li>
										If <BSInlineFunction>::ChooseSpawnableSpawnAreas</BSInlineFunction> returned a
										valid Spawn Area, it is added to the set that is returned. It is also removed
										from the candidate set and added to the invalid set, since it cannot be chosen
										again.
									</li>
								</ol>
								<p>
									Once the <BSInlineCode>FTargetSpawnParams</BSInlineCode> have been obtained,{" "}
									<BSInlineFunction>::SpawnTarget</BSInlineFunction> is called for each element in the
									set. The target sets its Attribute Set values like health and the amount of damage
									it deals to itself in{" "}
									<BSInlineFunction>::PostInitializeComponents</BSInlineFunction>, but it needs the
									game mode configuration data to do this. I use the{" "}
									<BSInlineFunction>::SpawnActor</BSInlineFunction> overload with{" "}
									<BSInlineCode>FActorSpawnParameters</BSInlineCode> to create a
									CustomPreSpawnInitialization function that calls{" "}
									<BSInlineFunction>ATarget::Init</BSInlineFunction>, which passes the relevant game
									mode configuration to the target. Using a CustomPreSpawnInitialization function is
									nice because <BSInlineFunction>::Init</BSInlineFunction> is guaranteed to be called
									before <BSInlineFunction>::PostInitializeComponents</BSInlineFunction>.
									Additionally, any immunity is applied to the target here, and the Projectile
									Movement Component is configured based on the game mode’s movement settings.
								</p>
								<p>
									Once a target has been spawned, it is added to the Target Manager&#39;s map of
									managed targets. The Spawn Area Manager&#39;s{" "}
									<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction> function is called by
									the Target Manager to assign the target&#39;s <BSInlineCode>FGuid</BSInlineCode>, or
									globally unique identifier, to the Spawn Area and flagged it as managed, signifying
									the Spawn Area now represents a target. The Spawn Area Manager maps the{" "}
									<BSInlineCode>FGuid</BSInlineCode> to the Spawn Area inside the GuidMap and the
									SpawnArea is added to the set of cached managed Spawn Areas, CachedManaged.
								</p>
								<MultiImageCarousel
									images={[
										{
											image: image_Execution1,
											figNumber: 0.1,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution2,
											figNumber: 0.2,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution3,
											figNumber: 0.3,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution4,
											figNumber: 0.4,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution5,
											figNumber: 0.5,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution6,
											figNumber: 0.6,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution7,
											figNumber: 0.7,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
									]}
								/>
							</div>
							<div className="article-subsection" ref={Ref_Activation} id="target-lifecycle-Activation">
								<BlogHeading headingText="Activation" headingLevel={2} />
								<p>
									The second function <BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>{" "}
									calls is <BSInlineFunction>::HandleTargetActivation</BSInlineFunction>.
								</p>
								{/* <BSCodeBlock>{OnAudioAnalyzerBeat}</BSCodeBlock> */}
								<p>
									Here, the TargetManager queries the Spawn Area Manager to get the number of
									activated and deactivated Spawn Areas and uses these values and the game mode
									settings to determine how many targets to activate. The Target Manager receives a
									set of target <BSInlineCode>FGuid</BSInlineCode>s from the Spawn Area Manager by
									calling <BSInlineFunction>::GetActivatableTargets</BSInlineFunction>, where the
									number of targets to activate are passed to the function.
								</p>
								<p>TODO: Massive breakdown of GetActivatableTargets</p>
								<p>
									Once the target <BSInlineCode>FGuid</BSInlineCode>s have been obtained,{" "}
									<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called for each one. This
									is where any Target Activation Responses are applied to the target.{" "}
								</p>
								<p>
									The Target Manager executes{" "}
									<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction> on the Spawn Area
									Manager, where the Spawn Area is added to the set of activated Spawn Areas
									(CachedActivated), the Spawn Area state is updated, and the target scale when
									activated is stored in the Spawn Area.
								</p>
								{/* <BSCodeBlock>{ActivateTarget}</BSCodeBlock> */}
								<p>
									As soon as the target is activated by the Target Manager, the timelines that control
									the color and/or scale of the target begin playing and a timer is set for the
									duration of its Max Lifespan. If the timer is allowed to expire, the target inflicts
									damage to itself equal to the Expiration Health Penalty using a{" "}
									<BSInlineCode>UGameplayEffect</BSInlineCode>.
								</p>
								{/* <BSCodeBlock>{FindNextTargetProperties}</BSCodeBlock> */}
								{/* <BSCodeBlock>{GetValidSpawnLocations}</BSCodeBlock> */}
								<MultiImageCarousel
									images={[
										{
											image: image_Execution8,
											figNumber: 0.1,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution9,
											figNumber: 0.2,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution10,
											figNumber: 0.3,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution11,
											figNumber: 0.4,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution12,
											figNumber: 0.5,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution13,
											figNumber: 0.6,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
									]}
								/>
							</div>
							<div
								className="article-subsection"
								ref={Ref_Deactivation}
								id="target-lifecycle-Deactivation"
							>
								<BlogHeading headingText="Deactivation" headingLevel={2} />
								<p>
									The catalyst for deactivation is the target health attribute changing. Any time this
									occurs, the <BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate is broadcast
									with a <BSInlineCode>FTargetDamageEvent</BSInlineCode> payload containing the
									following:
								</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Current health of the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineCode>FGuid</BSInlineCode> for the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										The length of time the target was alive for, or -1 if the target expired. This
										is mostly used for scoring
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Amount of health the target lost from this instance of damage
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										How the target lost health (player damage or self-inflicted)
									</li>
								</ul>
								<p>
									Every delegate is bound to the Target Manager&#39;s{" "}
									<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction> function. The Target
									Manager uses the data from the <BSInlineCode>FTargetDamageEvent</BSInlineCode> and
									the Target Deactivation Conditions to determine whether the target should be
									deactivated inside the <BSInlineFunction>::ShouldDeactivateTarget</BSInlineFunction>{" "}
									function. If it should be deactivated,{" "}
									<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is called, which handles
									applying all Target Deactivation Responses to the target and executes{" "}
									<BSInlineFunction>ATarget::DeactivateTarget</BSInlineFunction>. Similarly, the
									Target Destruction Conditions to determine whether the target should be destroyed
									inside the <BSInlineFunction>::ShouldDestroyTarget</BSInlineFunction> function.
								</p>
								<p>
									By this point, all data has been extracted from the target, and the{" "}
									<BSInlineCode>FTargetDamageEvent</BSInlineCode> has been updated indicating if the
									target will be deactivated and if the target will be destroyed.
								</p>
								<p>
									Then, the Target Manager updates the consecutive targets hit and adjusts the dynamic
									scale factor. This value controls the target scale if using a{" "}
									<BSInlineEnum>::SkillBased</BSInlineEnum> Consecutive Target Scale Policy and the
									total spawn area if using a <BSInlineEnum>::Dynamic</BSInlineEnum> Bounds Scaling
									Policy. The struct is then forwarded to the game mode which updates the score and
									player HUD.
								</p>
								<p>
									Next,{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::HandleTargetDamageEvent
									</BSInlineFunction>{" "}
									is called. The Spawn Area associated with the Target Guid is found and data about
									whether the target was successfully hit is stored. If the damage event indicates
									that the target was deactivated or destroyed,{" "}
									<BSInlineFunction>::RemoveActivatedFlagFromSpawnArea</BSInlineFunction> and
									<BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> are called. If the
									damage event indicates the target was destroyed,{" "}
									<BSInlineFunction>::RemoveManagedFlagFromSpawnArea</BSInlineFunction> is called.
								</p>
								<p>
									<BSInlineFunction>::RemoveActivatedFlagFromSpawnArea</BSInlineFunction> removes the
									the Spawn Area from the CachedManaged set and updates the state of the Spawn Area to
									be deactivated. <BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> adds
									the Spawn Area to the set of recent Spawn Areas, CachedRecent. Depending on the
									Recent Target Memory Policy, the Spawn Area is either removed, set to be removed on
									a timer, or removed at a later time based on the number of recent Spawn Areas.
								</p>
								<p>
									Next, if the game mode uses AI, the reward for the previous-current target location
									pair is updated in the the Reinforcement Learning Component.
								</p>
								<MultiImageCarousel
									images={[
										{
											image: image_Execution14,
											figNumber: 0.1,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution15,
											figNumber: 0.2,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution16,
											figNumber: 0.3,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution17,
											figNumber: 0.4,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution18,
											figNumber: 0.5,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution19,
											figNumber: 0.6,
											caption: "The largest valid rectangle of the total spawn area.",
											alt: "TODO",
											buttonText: "Largest",
										},
										{
											image: image_Execution20,
											figNumber: 0.7,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
										{
											image: image_Execution21,
											figNumber: 0.8,
											caption: "The largest rectangles that can fit a 5x5 grid block.",
											alt: "TODO",
											buttonText: "Optimal",
										},
									]}
								/>
								{/* <BSCodeBlock>{HandleDeactivation}</BSCodeBlock> */}
							</div>
							<div className="article-subsection" ref={Ref_Destruction} id="target-lifecycle-Destruction">
								<BlogHeading headingText="Destruction" headingLevel={2} />
								<p>
									Continuing right where the Deactivation section left off, if the target should be
									destroyed, the target is removed from the Target Manager&#39;s managed target map,
									and <BSInlineFunction>::Destroy</BSInlineFunction> is called on the target.
								</p>
								<ol>
									Destruction conditions are based on a combination of only two factors:
									<li>If the target expired or did not expire</li>
									<li>If the target&#39;s current health is zero</li>
								</ol>
							</div>
						</div>
						<div className="article-section" ref={Ref_Conclusion} id="conclusion">
							<BlogHeading headingText="Conclusion" headingLevel={1} />
							<p>TODO:</p>
						</div>
						<ArticleDateFooter postDate={postDate} editDate={editDate} />
					</article>
				</div>
			</div>
		</>
	);
};

const blogPostData: BlogPostData = {
	titleShort: titleShort,
	titleLong: titleLong,
	description: description,
	cardImage: image_Card,
	postDate: postDate,
	editDate: editDate,
};

export { TargetSpawningSystemPart2, blogPostData };
