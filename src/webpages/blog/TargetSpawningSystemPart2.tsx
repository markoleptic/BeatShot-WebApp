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
import image_Card from "public/targetSpawningSystem/Part2Card.jpg";
import image_Hero from "public/targetSpawningSystem/Part2Hero.jpg";
import image_TotalSpawnArea from "public/targetSpawningSystem/TotalSpawnArea.jpg";

const titleShort = "BeatShot's Target Spawning System: Part 2 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 2 - Target Lifecycle";
const description =
	"Discover how the classes and conventions introduced in Part 1 work together, as key functions and their roles are outlined throughout the target lifecycle.";
const postDate: DateTime = DateTime.fromFormat("July 20, 2024", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 20, 2024", "DDD");

const TargetSpawningSystemPart2 = () => {
	const Ref_Initialization = useRef(null);
	const Ref_Spawning = useRef(null);
	const Ref_Activation = useRef(null);
	const Ref_Deactivation = useRef(null);
	const Ref_Destruction = useRef(null);
	const Ref_Conclusion = useRef(null);

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
					<SidebarHashLink
						hash={`#target-lifecycle-Initialization`}
						onScreen={onScreen_Initialization}
						topLevelLink={true}
					>
						Initialization
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#target-lifecycle-Spawning`}
						onScreen={!onScreen_Initialization && onScreen_Spawning}
						topLevelLink={true}
					>
						Spawning
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#target-lifecycle-Activation`}
						onScreen={!onScreen_Initialization && !onScreen_Spawning && onScreen_Activation}
						topLevelLink={true}
					>
						Activation
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#target-lifecycle-Deactivation`}
						onScreen={
							!onScreen_Initialization &&
							!onScreen_Spawning &&
							!onScreen_Activation &&
							onScreen_Deactivation
						}
						topLevelLink={true}
					>
						Deactivation
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#target-lifecycle-Destruction`}
						onScreen={
							!onScreen_Initialization &&
							!onScreen_Spawning &&
							!onScreen_Activation &&
							!onScreen_Deactivation &&
							onScreen_Destruction
						}
						topLevelLink={true}
					>
						Destruction
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={
							!onScreen_Spawning &&
							!onScreen_Activation &&
							!onScreen_Deactivation &&
							!onScreen_Destruction &&
							onScreen_Conclusion
						}
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
						<p className="fs-300">
							Building on the foundation laid in Part 1, this section breaks down the triggers and
							execution paths that guide each target through its lifecycle. From spawning and activation
							to deactivation and eventual destruction, each step serves a unique purpose. Understanding
							these processes is crucial for grasping the intricacies of how targets are managed within
							the game.
						</p>
						<div className="article-section" ref={Ref_Initialization} id="target-lifecycle-Initialization">
							<BlogHeading headingText="Initialization" headingLevel={1} />
							<p>
								When the map is loaded, the game mode spawns the Target Manager and passes the game mode
								configuration to it. The Target Manager determines the minimum and maximum size of the
								total spawn area and sets the dimensions of all box components to appropriate values.
								Next, each component of the Target Manager is initialized.
							</p>
							<p>
								The Spawn Area Manager determines the dimensions of all Spawn Areas using the maximum
								size of the total spawn area. Then, it creates and initializes all Spawn Areas for the
								game mode.
							</p>
							<p>
								When a Spawn Area is created, it determines its{" "}
								<BSInlineEnum>EGridIndexType</BSInlineEnum> based on the location and index it received
								from the Spawn Area Manager. Using this, it stores the direction and index of all
								adjacent Spawn Areas in a map, which are used to find bordering Spawn Areas in
								Grid-based game modes.
							</p>
							<BSCodeBlock>{EGridIndexType}</BSCodeBlock>
						</div>
						<div className="article-section" ref={Ref_Spawning} id="target-lifecycle-Spawning">
							<BlogHeading headingText="Spawning" headingLevel={1} />
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
									<BSInlineEnum>::RuntimeOnly</BSInlineEnum>: Spawns targets based on beat thresholds
									detected by the audio analyzer, which triggers the game mode to call{" "}
									<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction> on the Target{" "}
									Manager.
								</li>
							</ul>
							<p>
								The first function <BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction> calls
								is <BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>, where the Target
								Manager determines how many targets to spawn. It ensures that only targets capable of
								activation are spawned, unless the game mode allows spawning without activation. For
								example, if three targets are currently activated and the{" "}
								<em>Maximum Number of Activated Targets at Once</em> is set to four, only one target
								will be spawned, regardless of the <em>Number of Runtime Targets to Spawn</em>.
							</p>
							<p>
								At the end of <BSInlineFunction>::HandleRuntimeSpawning</BSInlineFunction>, the size of
								the total spawn area is updated, and the sizes of the targets to spawn are determined
								using a curve table lookup if dynamic, or randomly selected if random. Finally, the
								Target Manager retrieves a set of{" "}
								<BSInlineFunction>FTargetSpawnParams</BSInlineFunction> from the Spawn Area Manager by
								calling <BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction>, where the number of
								targets to spawn and an array of target sizes are passed to the function.
							</p>
							<div className="padding-top-05rem padding-bottom-05rem">
								<Figure
									image={image_TotalSpawnArea}
									figNumber={1}
									figCaption={<>The current total spawn area inside the total spawn area</>}
									alt="TotalSpawnArea"
								/>
							</div>
							<p>
								<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is central to spawn location
								decision-making, involving several steps. For all <em>Target Distribution Policies</em>{" "}
								besides <BSInlineEnum>::Grid</BSInlineEnum>, the procedure is as follows:
							</p>
							<ol>
								<li>
									The set of Spawn Areas within the current total spawn area, shown as an orange box
									in Figure 1, is considered for spawning.
								</li>
								<li>
									The set of Spawn Areas that are managed, activated, or recent is obtained. These
									Spawn Areas, which will be removed from the candidate set, are referred to as the
									invalid set.
								</li>
								<li>
									The main loop iterates over the number of targets to spawn. At each iteration, a
									copy of the Spawn Area candidates is passed to{" "}
									<BSInlineFunction>::RemoveOverlappingSpawnAreas</BSInlineFunction>, which performs
									the following:
									<ol>
										<li>Removes all Spawn Areas in the invalid set from the candidates.</li>
										<li>
											For each managed, activated, or recent Spawn Area, a sphere trace is
											performed to identify Spawn Areas that should be removed due to overlapping
											targets. These are the red boxes <b>inside</b> the current total spawn area
											in Figure 1.
										</li>
										<li>
											For more details on this process, check out the{" "}
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
									<BSInlineFunction>::ChooseSpawnableSpawnArea</BSInlineFunction> is called with the
									modified candidate set and the set of Spawn Areas chosen during iteration. This
									function determines which Spawn Area to choose using a priority list based on game
									mode settings, defaulting to random if a higher priority setting fails to select a
									valid Spawn Area.
									<ol>
										<li>
											<em>Force Every Other Target In Center</em> : chooses the center-most Spawn
											Area.
										</li>
										<li>
											<em>Spawn In Center When Possible</em> : chooses the center-most Spawn Area
											if available.
										</li>
										<li>
											<em>AI Enabled</em> : Passes the modified candidate set to the Reinforcement
											Learning Component, which selects a Spawn Area.
										</li>
										<li>Chooses a random Spawn Area from the candidates.</li>
									</ol>
								</li>
								<li>
									If <BSInlineFunction>::ChooseSpawnableSpawnArea</BSInlineFunction> returns a valid
									Spawn Area, it is removed from the candidate set, added to the invalid set, and an{" "}
									<BSInlineCode>FTargetSpawnParams</BSInlineCode> structure is created and added to
									the returned set.
								</li>
							</ol>
							<p>
								Once the set of <BSInlineCode>FTargetSpawnParams</BSInlineCode> has been obtained,{" "}
								<BSInlineFunction>::SpawnTarget</BSInlineFunction> is called for each element in the
								set. The target sets its Attribute Set values, such as health and damage, in{" "}
								<BSInlineFunction>::PostInitializeComponents</BSInlineFunction>, but it requires the
								game mode configuration data to do so. The{" "}
								<BSInlineFunction>::SpawnActor</BSInlineFunction> overload with{" "}
								<BSInlineCode>FActorSpawnParameters</BSInlineCode> is used to create a custom pre-spawn
								initialization function that calls <BSInlineFunction>ATarget::Init</BSInlineFunction>,
								passing the relevant game mode configuration to the target. Using a custom pre-spawn
								initialization ensures that <BSInlineFunction>::Init</BSInlineFunction> is called before{" "}
								<BSInlineFunction>::PostInitializeComponents</BSInlineFunction>. Additionally, any
								immunity is applied to the target here, and the Projectile Movement Component is
								configured based on the game mode’s movement settings.
							</p>
							<p>
								Once a target has been spawned, it is added to the Target Manager&#39;s map of managed
								targets. The Target Manager calls the Spawn Area Manager&#39;s{" "}
								<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction> function, assigning the
								target&#39;s <BSInlineCode>FGuid</BSInlineCode> (globally unique identifier) to the
								Spawn Area, signifying it now represents a target. Finally, it is cached to the set of
								managed Spawn Areas.
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
													<BSInlineFunction>::SpawnTarget</BSInlineFunction> is called inside{" "}
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
													<BSInlineFunction>::SetIsManaged</BSInlineFunction> is called by the
													Spawn Area Manager inside{" "}
													<BSInlineFunction>::FlagSpawnAreaAsManaged</BSInlineFunction>.
												</>
											),
											alt: "SetIsManaged",
										},
									]}
								/>
							</div>
						</div>
						<div className="article-section" ref={Ref_Activation} id="target-lifecycle-Activation">
							<BlogHeading headingText="Activation" headingLevel={1} />
							<p>
								The second function that <BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction>{" "}
								calls is <BSInlineFunction>::HandleTargetActivation</BSInlineFunction>.
							</p>
							<p>
								The TargetManager queries the Spawn Area Manager to obtain the number of activated and
								deactivated Spawn Areas. Using these values along with the game mode settings, the
								Target Manager determines how many targets need to be activated. By calling{" "}
								<BSInlineFunction>::GetActivatableTargets</BSInlineFunction>, the Target Manager
								receives a set of target <BSInlineCode>FGuid</BSInlineCode>s, passing the number of
								targets to activate to the function. The process for identifying activatable targets is
								simpler than finding spawn locations and starts with using a priority list to gather
								activation candidates:
							</p>
							<ol>
								<li>
									The set of Spawn Areas that are managed, deactivated, and not recent is considered
									for activation.
								</li>
								<li>
									If no Spawn Areas that meet these criteria, the search is relaxed to include only
									managed and deactivated Spawn Areas.
								</li>
								<li>
									If no managed and deactivated Spawn Areas are found and{" "}
									<em>Allow Activation While Activated is true</em>, the set of activated Spawn Areas
									is considered for activation.
								</li>
							</ol>
							<p>
								If the <em>Target Activation Selection Policy</em> is set to{" "}
								<BSInlineEnum>::Bordering</BSInlineEnum>, all Spawn Areas that are not adjacent to the
								most recently activated Spawn Area are removed from the candidate set, provided this
								does not result in an empty candidate set.
							</p>
							<p>
								The procedure from this point is similar to{" "}
								<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction>:
							</p>
							<ol>
								<li>The main loop iterates over the number of targets to activate.</li>
								<li>
									<BSInlineFunction>::ChooseActivatableSpawnArea</BSInlineFunction> is called with the
									set of candidates and the set of Spawn Areas chosen during iteration. This function
									uses the same priority list as the{" "}
									<BSInlineFunction>::ChooseSpawnableSpawnArea</BSInlineFunction> function discussed
									earlier.
								</li>
								<li>
									If <BSInlineFunction>::ChooseActivatableSpawnArea</BSInlineFunction> returns a valid
									Spawn Area, it is removed from the candidate set, added to the chosen set, and the{" "}
									<BSInlineCode>FGuid</BSInlineCode> of the Spawn Area is added to the returned set.
								</li>
							</ol>
							<p>
								Once the set of target <BSInlineCode>FGuid</BSInlineCode>s have been obtained,{" "}
								<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called for each element in the
								set, applying any <em>Target Activation Responses</em> to the target.{" "}
							</p>
							<p>
								The Target Manager then calls{" "}
								<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction> on the Spawn Area
								Manager. This updates the state of the Spawn Area, stores the target scale when
								activated, and caches the Spawn Area in the set of activated Spawn Areas.
							</p>
							<p>
								As soon as a target is activated, its timelines controlling color and/or scale begin
								playing, and a timer is set for the duration of its <em>Max Lifespan</em>. If the timer
								expires, the target inflicts damage to itself equal to the{" "}
								<em>Expiration Health Penalty</em> using a <BSInlineCode>UGameplayEffect</BSInlineCode>.
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
													inside <BSInlineFunction>::HandleTargetActivation</BSInlineFunction>
													.
												</>
											),
											alt: "ActivateTarget",
										},
										{
											image: image_Execution11,
											figNumber: 3.4,
											caption: (
												<>
													<BSInlineFunction>::ActivateTarget</BSInlineFunction> is called by
													the Target Manager inside{" "}
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
													<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction> is
													called by the Target Manager inside{" "}
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
													<BSInlineFunction>::SetIsActivated</BSInlineFunction> is called by
													the Spawn Area Manager inside{" "}
													<BSInlineFunction>::FlagSpawnAreaAsActivated</BSInlineFunction>.
												</>
											),
											alt: "SetIsActivated",
										},
									]}
								/>
							</div>
						</div>
						<div className="article-section" ref={Ref_Deactivation} id="target-lifecycle-Deactivation">
							<BlogHeading headingText="Deactivation" headingLevel={1} />
							<p>
								Deactivation is triggered when the target’s health attribute changes. Whenever this
								occurs, the <BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate is broadcast from
								the target with an <BSInlineCode>FTargetDamageEvent</BSInlineCode> payload containing
								the following information:
							</p>
							<ul>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									The Current health of the target
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									The <BSInlineCode>FGuid</BSInlineCode> of the target
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									The duration for which the target has been alive, or -1 if the target expired. This
									information is primarily used for scoring purposes
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									The amount of health the target lost due to the damage event
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									The method by which the target lost health (player damage or self-inflicted)
								</li>
							</ul>
							<p>
								Each <BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate is bound to the Target
								Manager&#39;s <BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction> function.
								The Target Manager processes the data from the{" "}
								<BSInlineCode>FTargetDamageEvent</BSInlineCode> using the following functions to
								determine the target&#39;s fate:
							</p>
							<ul>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineFunction>::ShouldDeactivateTarget</BSInlineFunction> evaluates whether the
									target should be deactivated based on the <em>Target Deactivation Conditions</em>.
									If deactivation is warranted,{" "}
									<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is called to apply any{" "}
									<em>Target Deactivation Responses</em> and execute{" "}
									<BSInlineFunction>ATarget::DeactivateTarget</BSInlineFunction>.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineFunction>::ShouldDestroyTarget</BSInlineFunction> assesses whether the
									target should be destroyed based on the <em>Target Destruction Conditions</em>.
								</li>
							</ul>
							<p>
								At this stage, all relevant data has been extracted from the target, and the{" "}
								<BSInlineCode>FTargetDamageEvent</BSInlineCode> is updated to reflect whether the target
								was deactivated and if it will be destroyed.
							</p>
							<p>
								The Target Manager then updates the count of consecutive targets hit and adjusts the
								dynamic scale factor. This value influence the target size under a{" "}
								<BSInlineEnum>::SkillBased</BSInlineEnum> Consecutive Target Scale Policy and the total
								spawn area under a <BSInlineEnum>::Dynamic</BSInlineEnum> Bounds Scaling Policy. The{" "}
								<BSInlineCode>FTargetDamageEvent</BSInlineCode> is subsequently forwarded to the game
								mode, which updates the score and player HUD.
							</p>
							<p>
								Next,{" "}
								<BSInlineFunction>USpawnAreaManagerComponent::HandleTargetDamageEvent</BSInlineFunction>{" "}
								is called. The Spawn Area associated with the target&#39;s{" "}
								<BSInlineCode>FGuid</BSInlineCode> is identified, and data on whether the target was
								successfully hit is recorded. If the damage event indicates that the target was
								deactivated or will be destroyed, the following functions are executed:
							</p>
							<ul>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineFunction>::RemoveActivatedFlagFromSpawnArea</BSInlineFunction> removes the
									the Spawn Area from the cached set of Activated Spawn Areas and updates its state.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> adds the Spawn Area to
									the set of recent Spawn Areas. Depending on the <em>Recent Target Memory Policy</em>
									, the Spawn Area may be removed immediately, on a timer, or later based on the
									number of recent Spawn Areas.
								</li>
							</ul>
							<p>
								If the damage event indicates the target will be destroyed,{" "}
								<BSInlineFunction>::RemoveManagedFlagFromSpawnArea</BSInlineFunction> is called to
								remove the the Spawn Area from the cached set of Managed Spawn Areas.
							</p>
							<p>
								If <em>AI Enabled</em>, the reward for the previous-current target location pair is
								updated in the Reinforcement Learning Component.
							</p>
							<p>Figure 4 shows the execution path from the moment a target is damaged.</p>
							<div className="padding-top-05rem padding-bottom-05rem">
								<MultiImageCarousel
									images={[
										{
											image: image_Execution14,
											figNumber: 4.1,
											caption: (
												<>
													<BSInlineFunction>::HandleDamageEvent</BSInlineFunction> is called
													by the target&#39;s health component due to a health attribute
													change.
												</>
											),
											alt: "HandleDamageEvent",
										},
										{
											image: image_Execution15,
											figNumber: 4.2,
											caption: (
												<>
													<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction> is
													called since it is bound to the{" "}
													<BSInlineCode>OnTargetDamageEvent</BSInlineCode> delegate, which is
													called inside{" "}
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
													<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is called
													inside{" "}
													<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction> if
													the target should be deactivated.
												</>
											),
											alt: "DeactivateTarget",
										},
										{
											image: image_Execution17,
											figNumber: 4.4,
											caption: (
												<>
													<BSInlineFunction>::DeactivateTarget</BSInlineFunction> is called by
													the Target Manager inside{" "}
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
													<BSInlineFunction>::HandleTargetDamageEvent</BSInlineFunction> is
													called by the Target Manager inside{" "}
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
													<BSInlineFunction>::SetIsManaged</BSInlineFunction> is called by the
													Spawn Area Manager inside{" "}
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
													<BSInlineFunction>::SetIsActivated</BSInlineFunction> is called by
													the Spawn Area Manager inside{" "}
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
													<BSInlineFunction>::SetIsRecent</BSInlineFunction> is called by the
													Spawn Area Manager inside{" "}
													<BSInlineFunction>::FlagSpawnAreaAsRecent</BSInlineFunction> if the
													target was deactivated or will be destroyed.
												</>
											),
											alt: "SetIsRecent",
										},
									]}
								/>
							</div>
						</div>
						<div className="article-section" ref={Ref_Destruction} id="target-lifecycle-Destruction">
							<BlogHeading headingText="Destruction" headingLevel={1} />
							<p>
								When a target is flagged for destruction, it is first removed from the Target
								Manager&#39;s managed target map. The <BSInlineFunction>::Destroy</BSInlineFunction>{" "}
								function is then called on the target to handle its removal from the game.
							</p>
						</div>
						<div className="article-section" ref={Ref_Conclusion} id="conclusion">
							<BlogHeading headingText="Conclusion" headingLevel={1} />
							<p className="fs-300">
								Exploring the intricate processes behind target spawning, activation, deactivation, and
								destruction highlights the complexity of creating a target management system for an
								aim-training game. The detailed breakdown of each step in the target lifecycle helps
								provide a deeper understanding of the game&#39;s mechanics. Whether you&#39;re a player
								or a developer, I hope you appreciate the design choices that went into BeatShot&#39;s
								target spawning system.
							</p>
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
