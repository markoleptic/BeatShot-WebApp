"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import { EGridIndexType } from "@/components/blog/TargetSpawningSystemFunctions";
import { BlogHeading } from "@/components/BlogHeading";
import { BSCodeBlock, BSInlineCode, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
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
import image_Card from "public/targetSpawningSystem/Part1Card.jpg";
import image_Hero from "public/targetSpawningSystem/Part1Hero.jpg";
import image_TotalSpawnArea from "public/targetSpawningSystem/TotalSpawnArea.jpg";

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
							Every target goes through the same lifecycle of spawning, activation, deactivation, and
							destruction. This article focuses on what triggers these lifecycle events and the execution
							paths that lead to them.
						</p>
						<div className="article-section" ref={Ref_TargetLifeCycle} id="target-lifecycle">
							<BlogHeading headingText="Target Lifecycle" headingLevel={1} />
							<div
								className="article-subsection"
								ref={Ref_Initialization}
								id="target-lifecycle-Initialization"
							>
								<BlogHeading headingText="Initialization" headingLevel={2} />
								<p>
									When the map is loaded, the game mode spawns the Target Manager and passes the game
									mode configuration to it. The Target Manager determines the minimum and maximum size
									of the total spawn area and sets the dimensions of all box components to appropriate
									values. Next, each component of the Target Manager is initialized.
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
									of all adjacent Spawn Areas in a map, which are used to find bordering Spawn Areas
									in Grid-based game modes.
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
									calls is <BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>, where the
									Target Manager determines how many targets to spawn. It ensures it only spawns
									targets that can be activated, unless the game mode allows spawning without
									activation. For example, if three targets are currently activated, and the{" "}
									<em>Maximum Number of Activated Targets at Once</em> is set to four, only one target
									will be spawned regardless of the <em>Number of Runtime Targets to Spawn</em>.
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
								<div className="padding-top-05rem padding-bottom-05rem">
									<Figure
										image={image_TotalSpawnArea}
										figNumber={1}
										figCaption={
											<>
												The <span className="text-orange">current total spawn</span> inside the
												total spawn area
											</>
										}
										alt="TotalSpawnArea"
									/>
								</div>
								<p>
									<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is the heart of the
									spawn location decision making, and a lot is involved. The procedure for all{" "}
									<em>Target Distribution Policies</em> besides <BSInlineEnum>::Grid</BSInlineEnum> is
									as follows:
								</p>
								<ol>
									<li>
										The set of Spawn Areas inside the current total spawn area, shown as an{" "}
										<span className="text-orange">orange box</span> in Figure 1, are considered
										candidates for spawning.
									</li>
									<li>
										The set of Spawn Areas that are managed, activated, or recent is obtained. Since
										these Spawn Areas will be removed from the candidate set, I will refer to these
										as the invalid set.
									</li>
									<li>
										The main loop iterates over the number of targets to spawn. At each iteration, a
										copy of the Spawn Area candidates is passed to{" "}
										<BSInlineFunction>::RemoveOverlappingSpawnAreas</BSInlineFunction>, which does
										the following:
										<ol>
											<li>
												All Spawn Areas that are managed, activated, or recent are removed from
												the candidates.
											</li>
											<li>
												For each managed, activated, or recent Spawn Area, a sphere trace is
												performed to find adjacent Spawn Areas that should be removed due to a
												target overlapping adjacent Spawn Areas. These are the{" "}
												<span className="text-red">red boxes</span> <b>inside</b> the{" "}
												<span className="text-orange">current total spawn area</span> in Figure
												1.
											</li>
											<li>
												If you want to learn more about this process, check out the{" "}
												<Link
													className="text-light hover-white"
													href="devblog/spawning-targets-without-intersection"
												>
													Spawning Targets Without Intersection article
												</Link>
												.
											</li>
										</ol>
									</li>
									<li>
										<BSInlineFunction>::ChooseSpawnableSpawnAreas</BSInlineFunction> is called with
										the modified candidate set along and a set of Spawn Areas that have been chosen
										during iteration. This function determines which Spawn Area to choose using a
										priority list based on game mode settings, defaulting to random if a higher
										priority setting fails to choose a valid Spawn Area.
										<ol>
											<li>
												<em>Force Every Other Target In Center</em> will choose the center-most
												Spawn Area.
											</li>
											<li>
												<em>Spawn In Center When Possible</em> will choose the center-most Spawn
												Area, if available.
											</li>
											<li>
												If <em>AI Enabled</em>, the modified candidate set is passed to the
												Reinforcement Learning Component and it chooses a Spawn Area.
											</li>
											<li>A random Spawn Area is chosen from the candidates.</li>
										</ol>
									</li>
									<li>
										If <BSInlineFunction>::ChooseSpawnableSpawnAreas</BSInlineFunction> returned a
										valid Spawn Area, it is removed from the candidate set, added to the invalid
										set, and an <BSInlineCode>FTargetSpawnParams</BSInlineCode> structure is created
										and added to the set that is returned.
									</li>
								</ol>
								<p>
									Once the set of <BSInlineCode>FTargetSpawnParams</BSInlineCode> has been obtained,{" "}
									<BSInlineFunction>::SpawnTarget</BSInlineFunction> is called for each element in the
									set. The target sets its Attribute Set values like health and the amount of damage
									it deals to itself in{" "}
									<BSInlineFunction>::PostInitializeComponents</BSInlineFunction>, but it needs the
									game mode configuration data to do this. I use the{" "}
									<BSInlineFunction>::SpawnActor</BSInlineFunction> overload with{" "}
									<BSInlineCode>FActorSpawnParameters</BSInlineCode> to create a custom pre-spawn
									initialization function that calls{" "}
									<BSInlineFunction>ATarget::Init</BSInlineFunction>, which passes the relevant game
									mode configuration to the target. Using a custom pre-spawn initialization function
									is nice because <BSInlineFunction>::Init</BSInlineFunction> is guaranteed to be
									called before <BSInlineFunction>::PostInitializeComponents</BSInlineFunction>.
									Additionally, any immunity is applied to the target here, and the Projectile
									Movement Component is configured based on the game mode’s movement settings.
								</p>
								<p>
									Once a target has been spawned, it is added to the Target Manager&#39;s map of
									managed targets. The Spawn Area Manager&#39;s{" "}
									<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction> function is called by
									the Target Manager. Here, the target&#39;s <BSInlineCode>FGuid</BSInlineCode>, or
									globally unique identifier, is assigned to the Spawn Area, signifying it now
									represents a target. Lastly, it is cached to the set of managed Spawn Areas.
								</p>
								<p>Figure 2 shows the execution path covered up to this point.</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<MultiImageCarousel
										images={[
											{
												image: image_Execution1,
												figNumber: 2.1,
												caption: (
													<>
														The game mode calls{" "}
														<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>.
													</>
												),
												alt: "HandleAudioAnalyzerBeat",
											},
											{
												image: image_Execution2,
												figNumber: 2.2,
												caption: (
													<>
														<BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction> is
														called inside{" "}
														<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>.
													</>
												),
												alt: "HandleRuntimeSpawning",
											},
											{
												image: image_Execution3,
												figNumber: 2.3,
												caption: (
													<>
														<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is
														called by the Target Manager inside{" "}
														<BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>.
													</>
												),
												alt: "GetTargetSpawnParams",
											},
											{
												image: image_Execution4,
												figNumber: 2.4,
												caption: (
													<>
														<BSInlineFunction>::SpawnTarget</BSInlineFunction> is called
														inside{" "}
														<BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>.
													</>
												),
												alt: "SpawnTarget",
											},
											{
												image: image_Execution5,
												figNumber: 2.5,
												caption: (
													<>
														<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction> is
														called by the Target Manager inside{" "}
														<BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>.
													</>
												),
												alt: "FlagSpawnAreaAsManaged",
											},
											{
												image: image_Execution6,
												figNumber: 2.6,
												caption: (
													<>
														<BSInlineFunction>::SetGuid</BSInlineFunction> is called by the
														Spawn Area Manager inside{" "}
														<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction>.
													</>
												),
												alt: "SetGuid",
											},
											{
												image: image_Execution7,
												figNumber: 2.7,
												caption: (
													<>
														<BSInlineFunction>::SetIsManaged</BSInlineFunction> is called by
														the Spawn Area Manager inside{" "}
														<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction>.
													</>
												),
												alt: "SetIsManaged",
											},
										]}
									/>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_Activation} id="target-lifecycle-Activation">
								<BlogHeading headingText="Activation" headingLevel={2} />
								<p>
									The second function <BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>{" "}
									calls is <BSInlineFunction>::HandleTargetActivation</BSInlineFunction>.
								</p>
								<p>
									The TargetManager queries the Spawn Area Manager to get the number of activated and
									deactivated Spawn Areas and uses these values and the game mode settings to
									determine how many targets to activate. The Target Manager receives a set of target{" "}
									<BSInlineCode>FGuid</BSInlineCode>s from the Spawn Area Manager by calling{" "}
									<BSInlineFunction>::GetActivatableTargets</BSInlineFunction>, where the number of
									targets to activate are passed to the function.
								</p>
								<p>TODO: Massive breakdown of GetActivatableTargets</p>
								<p>
									Once the set of target <BSInlineCode>FGuid</BSInlineCode>s have been obtained,{" "}
									<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called for each element in
									the set. This is where any <em>Target Activation Responses</em> are applied to the
									target.{" "}
								</p>
								<p>
									The Target Manager executes{" "}
									<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction> on the Spawn Area
									Manager, where the Spawn Area state is updated, the target scale when activated is
									stored, and the Spawn Area is cached to the set of activated Spawn Areas.
								</p>
								<p>
									As soon as the target is activated by the Target Manager, the timelines that control
									the color and/or scale of the target begin playing and a timer is set for the
									duration of its <em>Max Lifespan</em>. If the timer is allowed to expire, the target
									inflicts damage to itself equal to the <em>Expiration Health Penalty</em> using a{" "}
									<BSInlineCode>UGameplayEffect</BSInlineCode>.
								</p>
								<p>Figure 3 shows the execution path covered up to this point.</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<MultiImageCarousel
										images={[
											{
												image: image_Execution8,
												figNumber: 3.1,
												caption: (
													<>
														<BSInlineFunction>::HandleTargetActivation</BSInlineFunction> is
														called inside{" "}
														<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>.
													</>
												),
												alt: "HandleTargetActivation",
											},
											{
												image: image_Execution9,
												figNumber: 3.2,
												caption: (
													<>
														<BSInlineFunction>::GetActivatableTargets</BSInlineFunction> is
														called by the Target Manager inside{" "}
														<BSInlineFunction>::HandleTargetActivation</BSInlineFunction>.
													</>
												),
												alt: "GetActivatableTargets",
											},
											{
												image: image_Execution10,
												figNumber: 3.3,
												caption: (
													<>
														<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called
														inside{" "}
														<BSInlineFunction>::HandleTargetActivation</BSInlineFunction>.
													</>
												),
												alt: "ActivateTarget",
											},
											{
												image: image_Execution11,
												figNumber: 3.4,
												caption: (
													<>
														<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called
														by the Target Manager inside{" "}
														<BSInlineFunction>::ActivateTarget</BSInlineFunction>.
													</>
												),
												alt: "ActivateTarget2",
											},
											{
												image: image_Execution12,
												figNumber: 3.5,
												caption: (
													<>
														<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction>{" "}
														is called by the Target Manager inside{" "}
														<BSInlineFunction>::ActivateTarget</BSInlineFunction>.
													</>
												),
												alt: "FlagSpawnAreaAsActivated",
											},
											{
												image: image_Execution13,
												figNumber: 3.6,
												caption: (
													<>
														<BSInlineFunction>::SetIsActivated</BSInlineFunction> is called
														by the Spawn Area Manager inside{" "}
														<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction>.
													</>
												),
												alt: "SetIsActivated",
											},
										]}
									/>
								</div>
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
									from the target with a <BSInlineCode>FTargetDamageEvent</BSInlineCode> payload
									containing the following:
								</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Current health of the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineCode>FGuid</BSInlineCode> of the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										The length of time the target was alive for, or -1 if the target expired. This
										is mostly used for scoring
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Amount of health the target lost from the damage event
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										How the target lost health (player damage or self-inflicted)
									</li>
								</ul>
								<p>
									Every <BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate is bound to the
									Target Manager&#39;s <BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction>{" "}
									function. The Target Manager passes the data from the{" "}
									<BSInlineCode>FTargetDamageEvent</BSInlineCode> to the following functions to
									adjudicate the target&#39;s fate:
								</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineFunction>::ShouldDeactivateTarget</BSInlineFunction> uses the{" "}
										<em>Target Deactivation Conditions</em> to determine whether the target should
										be deactivated. If it should,{" "}
										<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is called, which handles
										applying all <em>Target Deactivation Responses</em> to the target and executes{" "}
										<BSInlineFunction>ATarget::DeactivateTarget</BSInlineFunction>.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineFunction>::ShouldDestroyTarget</BSInlineFunction> uses the{" "}
										<em>Target Destruction Conditions</em> to determine whether the target should be
										destroyed.
									</li>
								</ul>

								<p>
									By this point, all data has been extracted from the target, and the{" "}
									<BSInlineCode>FTargetDamageEvent</BSInlineCode> has been updated indicating if the
									target was deactivated and if the target will be destroyed.
								</p>
								<p>
									The Target Manager updates the consecutive targets hit and adjusts the dynamic scale
									factor. This value controls the target scale if using a{" "}
									<BSInlineEnum>::SkillBased</BSInlineEnum> Consecutive Target Scale Policy and the
									total spawn area if using a <BSInlineEnum>::Dynamic</BSInlineEnum> Bounds Scaling
									Policy. The <BSInlineCode>FTargetDamageEvent</BSInlineCode> is then forwarded to the
									game mode which updates the score and player HUD.
								</p>
								<p>
									Next,{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::HandleTargetDamageEvent
									</BSInlineFunction>{" "}
									is called. The Spawn Area associated with the Target Guid is found and data about
									whether the target was successfully hit is stored. If the damage event indicates
									that the target was deactivated or will be destroyed, the following two functions
									are called:
								</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineFunction>::RemoveActivatedFlagFromSpawnArea</BSInlineFunction> removes
										the the Spawn Area from the cached set of Activated Spawn Areas and updates the
										state of the Spawn Area.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> caches the Spawn
										Area to the set of recent Spawn Areas. Depending on the{" "}
										<em>Recent Target Memory Policy</em>, the Spawn Area is either removed
										immediately, on a timer, or at a later time based on the number of recent Spawn
										Areas.
									</li>
								</ul>
								<p>
									If the damage event indicates the target will be destroyed,{" "}
									<BSInlineFunction>::RemoveManagedFlagFromSpawnArea</BSInlineFunction> is called to
									remove the the Spawn Area from the cached set of Managed Spawn Areas
								</p>
								<p>
									If <em>AI Enabled</em>, the reward for the previous-current target location pair is
									updated in the Reinforcement Learning Component.
								</p>
								<p>Figure 4 shows the execution path starting from when a target is damaged.</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<MultiImageCarousel
										images={[
											{
												image: image_Execution14,
												figNumber: 4.1,
												caption: (
													<>
														<BSInlineFunction>::HandleDamageEvent</BSInlineFunction> is
														called by the target&#39;s health component due to a health
														attribute change.
													</>
												),
												alt: "HandleDamageEvent",
											},
											{
												image: image_Execution15,
												figNumber: 4.2,
												caption: (
													<>
														<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction>{" "}
														is called since it is bound to the{" "}
														<BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate, which
														is called inside{" "}
														<BSInlineFunction>::HandleDamageEvent</BSInlineFunction>.
													</>
												),
												alt: "HandleTargetDamageEvent",
											},
											{
												image: image_Execution16,
												figNumber: 4.3,
												caption: (
													<>
														<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is
														called inside{" "}
														<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction>{" "}
														if the target should be deactivated.
													</>
												),
												alt: "DeactivateTarget",
											},
											{
												image: image_Execution17,
												figNumber: 4.4,
												caption: (
													<>
														<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is
														called by the Target Manager inside{" "}
														<BSInlineFunction>::DeactivateTarget</BSInlineFunction> if the
														target should be deactivated.
													</>
												),
												alt: "DeactivateTarget2",
											},
											{
												image: image_Execution18,
												figNumber: 4.5,
												caption: (
													<>
														<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction>{" "}
														is called by the Target Manager inside{" "}
														<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction>.
													</>
												),
												alt: "HandleTargetDamageEvent2",
											},
											{
												image: image_Execution19,
												figNumber: 4.6,
												caption: (
													<>
														<BSInlineFunction>::SetIsManaged</BSInlineFunction> is called by
														the Spawn Area Manager inside{" "}
														<BSInlineFunction>
															::RemoveManagedFlagFromSpawnArea
														</BSInlineFunction>{" "}
														if the target will be destroyed.
													</>
												),
												alt: "SetIsManaged",
											},
											{
												image: image_Execution20,
												figNumber: 4.7,
												caption: (
													<>
														<BSInlineFunction>::SetIsActivated</BSInlineFunction> is called
														by the Spawn Area Manager inside{" "}
														<BSInlineFunction>
															::RemoveActivatedFlagFromSpawnArea
														</BSInlineFunction>{" "}
														if the target was deactivated or will be destroyed.
													</>
												),
												alt: "SetIsActivated",
											},
											{
												image: image_Execution21,
												figNumber: 4.8,
												caption: (
													<>
														<BSInlineFunction>::SetIsRecent</BSInlineFunction> is called by
														the Spawn Area Manager inside{" "}
														<BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> if
														the target was deactivated or will be destroyed.
													</>
												),
												alt: "SetIsRecent",
											},
										]}
									/>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_Destruction} id="target-lifecycle-Destruction">
								<BlogHeading headingText="Destruction" headingLevel={2} />
								<p>
									If the target should be destroyed, the target is removed from the Target
									Manager&#39;s managed target map, and <BSInlineFunction>::Destroy</BSInlineFunction>{" "}
									is called on the target.
								</p>
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
