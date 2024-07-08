"use client";

import React, { useRef } from "react";
import useOnScreen from "@/hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "@/components/SidebarHashLink";
import { BSCodeBlock, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import image_Hero from "public/SpawnMemory_Hero_Cropped.png";
import image_OverlappingVerts from "public/OverlappingVerts.png";
import image_SpawnMemory_Dynamic_FewRecent from "public/SpawnMemory_Dynamic_FewRecent.png";
import image_SpawnMemory_Dynamic_ManyRecent from "public/SpawnMemory_Dynamic_ManyRecent.png";
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
import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

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
						<h1>A look into BeatShot&#39;s target spawning system</h1>
						<p className="hero-lead">
							How are spawn locations decided for targets? How are targets managed? This article goes into
							detail about how this is accomplished in Unreal.
						</p>
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
									the game mode configuration to it. It then passes the relevant configuration
									settings to each of its components inside{" "}
									<BSInlineFunction>ATargetManager::Init</BSInlineFunction>. More specifically, it
									does the following:
								</p>
								<ol>
									<li>Sets the dimensions of all box components</li>
									<li>
										Calls <BSInlineFunction>USpawnAreaManagerComponent::Init</BSInlineFunction>
									</li>
									<li>
										Calls <BSInlineFunction>UReinforcementLearningComponent::Init</BSInlineFunction>
									</li>
								</ol>
								<p>
									After receiving the game mode config from the Target Manager,{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::InitializeSpawnAreas
									</BSInlineFunction>{" "}
									is called to generate all Spawn Areas for the game mode. This is where the Spawn
									Area Manager Component determines how many Spawn Areas the total spawn area needs to
									be divided into. This happens inside{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::SetSpawnMemoryValues
									</BSInlineFunction>
									. Once the width and height of the Spawn Areas are found, the Spawn Area Manager
									Component creates a new USpawnArea object for each section of the total spawn area.
									It then calls <BSInlineFunction>USpawnArea::Init</BSInlineFunction>, which sets up
									basic information about the Spawn Area. Notably, it also specifies which type of
									section inside the total spawn area it belongs to, represented by EGridIndexType:
								</p>
								<BSCodeBlock>{EGridIndexType}</BSCodeBlock>
								<p>
									The Spawn Area then finds all adjacent Spawn Areas based on the Grid Index Type and
									the number of horizontal Spawn Areas that make up the total spawn area. The Grid
									Index Type allows the Grid <em>Target Distribution Policy</em> to quickly access all
									adjacent Spawn Areas, which is how BeatGrid finds targets to activate.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Spawning} id="target-lifecycle-Spawning">
								<BlogHeading headingText="Spawning" headingLevel={2} />
								<p>
									There are two spawning methods in BeatShot:{" "}
									<BSInlineEnum>ETargetSpawningPolicy::UpfrontOnly</BSInlineEnum> and{" "}
									<BSInlineEnum>ETargetSpawningPolicy::RuntimeOnly</BSInlineEnum>.
								</p>
								<p>
									Game modes using <BSInlineEnum>ETargetSpawningPolicy::UpfrontOnly</BSInlineEnum>{" "}
									spawn all targets inside <BSInlineFunction>ATargetManager::Init</BSInlineFunction>.
									No other targets are spawned for the duration of the game mode.
								</p>
								<p>
									Game modes using <BSInlineEnum>ETargetSpawningPolicy::RuntimeOnly</BSInlineEnum>{" "}
									spawn their targets based on beat thresholds being met by the audio analyzer, which
									triggers the game mode to call{" "}
									<BSInlineFunction>ATargetManager::OnAudioAnalyzerBeat</BSInlineFunction>. I discuss
									this function more in the Activation section, but for now I want to focus on what
									happens when any target is spawned, regardless of the Target Spawning Policy.
								</p>
								<BSCodeBlock>{SpawnTarget}</BSCodeBlock>
								<p>
									The location and scale of the target are retrieved from a previously found Spawn
									Area. I use SpawnActorDeferred so the game mode config can be passed to the target
									before it&#39;s finished spawning.
								</p>
								<p>
									<BSInlineFunction>ATarget::Init</BSInlineFunction> sets the Max Health attribute of
									the target and provides all the information the target needs about the game mode.
									The Target Manager binds to the target&#39;s OnTargetDamageEventOrTimeout delegate,
									which is broadcast when the health of the target is changed. This delegate is
									discussed more in the Deactivation section.
								</p>
								<p>
									The Spawn Area is assigned the target&#39;s global unique identifier, the target is
									added to the Target Manager&#39;s array of managed targets, and{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::FlagSpawnAreaAsManaged
									</BSInlineFunction>
									is called. This lets the Spawn Area Manager know that the Spawn Area now represents
									a target.
								</p>
								<p>
									When a Spawn Area is flagged as <em>Managed</em>,{" "}
									<BSInlineFunction>USpawnArea::GenerateOverlappingVertices</BSInlineFunction> is
									called. This function finds all surrounding Spawn Areas that would cause an overlap
									if a target with the same radius is spawned inside that Spawn Area. This is done by
									tracing a sphere centered at the location the target was spawned inside the Spawn
									Area. These traced spheres are shown in Figure TODO as purple wireframes, while the
									red and green points are the center of individual Spawn Areas.
								</p>
								<figure>
									<div className="figure-border-container">
										<Image src={image_OverlappingVerts} alt="OverlappingVerts" />
										<figcaption>
											<p className="figlabel">Figure TODO: </p>
											Overlapping Vertices generated after each target was flagged as Managed.
										</figcaption>
									</div>
								</figure>
								<p>
									The green points mean that it&#39;s currently safe to spawn a target in that Spawn
									Area, while the red points mean it&#39;s not. Each time a new target occupies a
									given Spawn Area, these vertices generated and stored. They are then used when
									finding subsequent target spawn locations, which is discussed in the Activation
									section.
								</p>
								<p>
									The radius of the traced sphere should be big enough that it captures all Spawn
									Areas that would cause an overlap, but small enough that it doesn&#39;t restrict the
									possible spawn locations to an unnecessary small amount. Since a target can spawn
									anywhere inside a Spawn Area, some amount of error is introduced.
								</p>
								<p>
									I ended up setting the traced sphere radius is equal to twice the radius of the
									target that was spawned in the spawn area plus the larger of the width and height of
									the Spawn Area. This seemed to give me the best results when testing many targets at
									once with varying scales, without restricting the number of spawn locations too
									much.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Activation} id="target-lifecycle-Activation">
								<BlogHeading headingText="Activation" headingLevel={2} />
								<p>
									The chain of events leading to target activation begins when the game mode recieves
									input from the audio analyzer that the beat threshold has been met, and calls{" "}
									<BSInlineFunction>ATargetManager::OnAudioAnalyzerBeat</BSInlineFunction>. If using a
									song from a file, this would occur exactly Spawn Beat Delay seconds before you
									actually hear the beat.
								</p>
								<BSCodeBlock>{OnAudioAnalyzerBeat}</BSCodeBlock>
								<p>
									The TargetManager looks for any existing target(s) that can be activated, and tries
									to activate them according to the game mode config using{" "}
									<BSInlineFunction>ATargetManager::HandleActivateExistingTargets</BSInlineFunction>.
								</p>
								<p>
									If the game mode config allows for targets to be spawned at runtime (
									<BSInlineEnum>ETargetSpawningPolicy::RuntimeOnly</BSInlineEnum>
									),{" "}
									<BSInlineFunction>
										ATargetManager::HandleRuntimeSpawnAndActivation
									</BSInlineFunction>{" "}
									is called.
								</p>
								<p>
									In both of these functions, the general procedure is to activate the target{" ("}
									<BSInlineFunction>ATargetManager::ActivateTarget</BSInlineFunction>
									{")"} and then find the scale and Spawn Area for the next target if it was
									successfully activated
									{" ("}
									<BSInlineFunction>ATargetManager::FindNextTargetProperties</BSInlineFunction>
									{")"}.
								</p>
								<BSCodeBlock>{ActivateTarget}</BSCodeBlock>
								<p>
									The only two Spawn Area objects that the Target Manager keeps track of are the
									PreviousSpawnArea and the CurrentSpawnArea. The only place these two variables are
									changed is inside{" "}
									<BSInlineFunction>ATargetManager::FindNextTargetProperties</BSInlineFunction>, and
									this function is always called immediately after activating a target.
								</p>
								<BSCodeBlock>{FindNextTargetProperties}</BSCodeBlock>
								<p>
									<BSInlineFunction>ATargetManager::GetNextTargetScale</BSInlineFunction> returns
									either a random target scale between the Min and Max Target Scale or a dynamic
									target scale taken from a curve based on the number of recent targets successfully
									destroyed.
								</p>
								<p>
									The Spawn Area containing the next target location is found using{" "}
									<BSInlineFunction>ATargetManager::GetNextSpawnArea</BSInlineFunction>, which goes
									through several checks to see if it can spawn at the origin or get a Spawn Area from
									the RL Component, but the main thing I want to focus on is when it calls{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::GetValidSpawnLocations
									</BSInlineFunction>
									. This function is the heart of spawn location decision making.
								</p>
								<BSCodeBlock>{GetValidSpawnLocations}</BSCodeBlock>
								<p>
									The game mode config&#39;s Target Distribution Policy dictates which series of
									functions are executed. Most distribution policies begin considering all Spawn Areas
									as valid choices, rather than only finding Spawn Areas that aren&#39;t currently
									activated or recent. This is because a smaller target may spawn before a larger
									target, and the cutout size of the sphere it left will not be big enough to safely
									spawn the next larger target without overlapping the smaller one. This is also why
									the target scale is found before finding the Spawn Area.
								</p>
								<p>
									<BSInlineFunction>
										USpawnAreaManagerComponent::HandleFullRangeSpawnLocations
									</BSInlineFunction>{" "}
									removes all Spawn Areas that fall outside of the current total spawn area. This only
									applies to game modes using{" "}
									<BSInlineEnum>EBoundsScalingPolicy::Dynamic</BSInlineEnum> since the total spawn
									area is always the same for game modes using{" "}
									<BSInlineEnum>EBoundsScalingPolicy::Static</BSInlineEnum>. Referring to Figure TODO,
									the red boxes outside the the current spawn area (blue box) are the Spawn Areas this
									function removed from consideration for a game mode using{" "}
									<BSInlineEnum>EBoundsScalingPolicy::Dynamic</BSInlineEnum>.
								</p>
								<p>
									<BSInlineFunction>
										USpawnAreaManagerComponent::HandleEdgeOnlySpawnLocations
									</BSInlineFunction>{" "}
									only adds the points along the border of the current total spawn area.
								</p>
								<figure>
									<div className="figure-border-container">
										<Image
											src={image_SpawnMemory_Dynamic_FewRecent}
											alt="SpawnMemory_Dynamic_FewRecent"
										/>
										<figcaption>
											<p className="figlabel">Figure TODO: </p>
											All Spawn Areas for a game mode using{" "}
											<BSInlineEnum>EBoundsScalingPolicy::Dynamic</BSInlineEnum>, where green
											boxes represent valid and red boxes represent invalid. The blue box
											represents the current total spawn area.
										</figcaption>
									</div>
								</figure>
								<p>
									All Target Distribution Policies besides Grid call{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::RemoveOverlappingSpawnLocations
									</BSInlineFunction>
									. This function loops over all Spawn Areas that are flagged as <em>Activated</em> or{" "}
									<em>Recent</em> and adds their overlapping vertices to a temporary array that is
									used to filter the spawn locations passed by reference to the function.
								</p>
								<BSCodeBlock>{RemovingOverlappingSpawnLocations}</BSCodeBlock>
								<p>
									The overlapping vertices that are added are the same overlapping vertices that were
									generated when the target was spawned. If the scale for the target to be spawned is
									greater than the scale that the overlapping points were generated with, a temporary
									set is generated using the larger radius.
								</p>
								<p>
									As soon as the target is activated by the Target Manager, the timelines that control
									the color and/or scale of the target begin playing and a timer is set for the
									duration of its Max Lifespan. If the timer is allowed to expire, the target damages
									itself using a <BSInlineFunction>UGameplayEffect</BSInlineFunction> that applies
									damage equal to the Expiration Health Penalty.
								</p>
							</div>
							<div
								className="article-subsection"
								ref={Ref_Deactivation}
								id="target-lifecycle-Deactivation"
							>
								<BlogHeading headingText="Deactivation" headingLevel={2} />
								<p>
									The catalyst for deactivation is the target&#39;s health attribute changing. Any
									time this occurs, the OnTargetDamageEventOrTimeout delegate introduced in the
									Spawning section is broadcast to the Target Manager.
								</p>
								<ul>
									This delegate sends a struct containing the following:
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Current health of the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Global unique identifier for the target
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										How far into the target&#39;s Max Lifespawn the target was destroyed. The value
										will be -1 if the target expired. This is mostly used for scoring
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										How much health the target lost from this instance of damage
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										How the target lost health (player damage or self-inflicted)
									</li>
								</ul>
								<p>
									<BSInlineFunction>ATargetManager::OnTargetHealthChangedOrExpired</BSInlineFunction>{" "}
									is the function that all targets broadcast the delegate to.
								</p>
								<p>
									First, the Target Manager updates the consecutive targets hit and adjusts the
									dynamic scale factor. This value controls the target scale if using{" "}
									<BSInlineEnum>EConsecutiveTargetScalePolicy::SkillBased</BSInlineEnum> and the total
									spawn area if using <BSInlineEnum>EBoundsScalingPolicy::Dynamic</BSInlineEnum>. The
									struct is then forwarded to the game mode which updates the score and player HUD.
									The target is removed from the Target Manager&#39;s managed target array if the
									Target Destruction Conditions permit. Any time a target is removed from this array,{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::RemoveManagedFlagFromSpawnArea
									</BSInlineFunction>{" "}
									is also called.
								</p>
								<p>
									Next, if the game mode uses the RL Component, the reward for the previous-current
									target location pair is updated.
								</p>
								<p>
									Then,{" "}
									<BSInlineFunction>
										USpawnAreaManagerComponent::HandleRecentTargetRemoval
									</BSInlineFunction>{" "}
									is called. This function removes the Activated flag from the Spawn Area and flags it
									as Recent. A timer is set based on the <em>Recent Target Memory Policy</em> and the
									Recent flag is then removed when the timer expires. Upon removal of the Recent flag,
									the overlapping vertices that were generated when the target was spawned are
									emptied.
								</p>
								<p>
									If the game mode uses a Recent Target Memory Policy that keeps the footprint of
									recent targets too long, targets won&#39;t have anywhere to be spawned. Figure TODO
									shows what it looks like moments before disaster (not really, the game simply
									won&#39;t spawn a target until there&#39;s space).
								</p>
								<figure>
									<div className="figure-border-container">
										<Image
											src={image_SpawnMemory_Dynamic_ManyRecent}
											alt="SpawnMemory_Dynamic_ManyRecent"
										/>
										<figcaption>
											<p className="figlabel">Figure TODO: </p>
											All Spawn Areas for a game mode using a Recent Target Memory Policy that
											keeps targets for 1.5 seconds after they are deactivated.
										</figcaption>
									</div>
								</figure>
								<p>
									Finally, the target then checks its Target Deactivation Conditions to see if it
									should deactivate. Deactivation conditions are solely based on whether or not the
									target expired. If a deactivation condition was met,{" "}
									<BSInlineFunction>ATarget::HandleDeactivationResponses</BSInlineFunction> is called.
								</p>
								<BSCodeBlock>{HandleDeactivation}</BSCodeBlock>
							</div>
							<div className="article-subsection" ref={Ref_Destruction} id="target-lifecycle-Destruction">
								<BlogHeading headingText="Destruction" headingLevel={2} />
								<p>
									Just after checking deactivation conditions and broadcasting the
									OnTargetDamageEventOrTimeout delegate, the target checks the Target Destruction
									Conditions to see if it needs to destroy itself. Since the target broadcast the
									delegate before checking the Destruction Conditions, the Target Manager will have
									already removed it from its managed target array before the target destroys itself.
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
							<p>
								Well, that was a lot. The system I described is by no means the only way to approach the
								problem, it&#39;s just the way that made sense to me and worked. I hoped you learned
								something and weren&#39;t too overwhelmed.
							</p>
						</div>
						<div className="article-section">
							<p className="inline posted-date">
								<span className="inline text-light">Posted:</span> July 2, 2023
								<br></br>
								<time dateTime="2023-12-23">
									<span className="inline text-light">Updated:</span> December 23, 2023
								</time>
							</p>
						</div>
					</article>
				</div>
			</div>
		</>
	);
};

export default TargetSpawningSystemPart2;
