"use client";

import React, { useRef } from "react";
import useOnScreen from "@/hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "@/components/SidebarHashLink";
import { BSCodeBlock, BSInlineCodeBlock, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import image_BoxBounds from "public/BoxBounds.png";
import image_ClusterBeat from "public/ClusterBeat.png";
import image_TotalSpawnArea from "public/TotalSpawnArea.png";
import image_Hero from "public/SpawnMemory_Hero_Cropped.png";
import image_OverlappingVerts from "public/OverlappingVerts.png";
import image_SphereColorGradient from "public/SphereColorGradient.png";
import image_BeatGrid from "public/BeatGrid.png";
import image_NonBeatGrid from "public/NonBeatGrid.png";
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

const TargetSpawningSystem = () => {
	const Ref_Classes = useRef(null);
	const Ref_USpawnArea = useRef(null);
	const Ref_ATargetManager = useRef(null);
	const Ref_UBoxComponent = useRef(null);
	const Ref_UReinforcementLearningComponent = useRef(null);
	const Ref_USpawnAreaManagerComponent = useRef(null);
	const Ref_ATarget = useRef(null);
	const Ref_UProjectileMovementComponent = useRef(null);
	const Ref_UBSAbilitySystemComponent = useRef(null);
	const Ref_UBSHealthComponent = useRef(null);
	const Ref_ABSGameMode = useRef(null);

	const Ref_States = useRef(null);
	const Ref_TargetStates = useRef(null);
	const Ref_SpawnAreaStates = useRef(null);
	const Ref_ConditionsAndResponses = useRef(null);
	const Ref_Conditions = useRef(null);
	const Ref_Responses = useRef(null);
	const Ref_TargetDistributionPolicy = useRef(null);

	const Ref_TargetLifeCycle = useRef(null);
	const Ref_Initialization = useRef(null);
	const Ref_Spawning = useRef(null);
	const Ref_Activation = useRef(null);
	const Ref_Deactivation = useRef(null);
	const Ref_Destruction = useRef(null);
	const Ref_Conclusion = useRef(null);

	const onScreen_Classes = useOnScreen(Ref_Classes);
	const onScreen_USpawnArea = useOnScreen(Ref_USpawnArea);
	const onScreen_ATargetManager = useOnScreen(Ref_ATargetManager);
	const onScreen_UBoxComponent = useOnScreen(Ref_UBoxComponent);
	const onScreen_UReinforcementLearningComponent = useOnScreen(Ref_UReinforcementLearningComponent);
	const onScreen_USpawnAreaManagerComponent = useOnScreen(Ref_USpawnAreaManagerComponent);
	const onScreen_ATarget = useOnScreen(Ref_ATarget);
	const onScreen_UProjectileMovementComponent = useOnScreen(Ref_UProjectileMovementComponent);
	const onScreen_UBSAbilitySystemComponent = useOnScreen(Ref_UBSAbilitySystemComponent);
	const onScreen_UBSHealthComponent = useOnScreen(Ref_UBSHealthComponent);
	const onScreen_ABSGameMode = useOnScreen(Ref_ABSGameMode);

	const onScreen_States = useOnScreen(Ref_States);
	const onScreen_TargetStates = useOnScreen(Ref_TargetStates);
	const onScreen_SpawnAreaStates = useOnScreen(Ref_SpawnAreaStates);
	const onScreen_ConditionsAndResponses = useOnScreen(Ref_ConditionsAndResponses);
	const onScreen_Conditions = useOnScreen(Ref_Conditions);
	const onScreen_Responses = useOnScreen(Ref_Responses);
	const onScreen_TargetDistributionPolicy = useOnScreen(Ref_TargetDistributionPolicy);

	const onScreen_TargetLifeCycle = useOnScreen(Ref_TargetLifeCycle);
	const onScreen_Initialization = useOnScreen(Ref_Initialization);
	const onScreen_Spawning = useOnScreen(Ref_Spawning);
	const onScreen_Activation = useOnScreen(Ref_Activation);
	const onScreen_Deactivation = useOnScreen(Ref_Deactivation);
	const onScreen_Destruction = useOnScreen(Ref_Destruction);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

	// const parentRef = useRef<HTMLDivElement>(null);
	// const childRef = useRef<HTMLDivElement>(null);
	// const childRef2 = useRef<HTMLDivElement>(null);

	// const checkWidth = () => {
	// 	if (parentRef.current && childRef.current) {
	// 		if (childRef.current.offsetWidth / parentRef.current.offsetWidth > 0.75) {
	// 			console.log(childRef.current.offsetWidth / parentRef.current.offsetWidth);
	// 			parentRef.current.className = "flex-dir-col";
	// 		} else {
	// 			parentRef.current.className = "flex-dir-row";
	// 		}
	// 	}
	// };
	// useEffect(() => {
	// 	checkWidth();
	// 	window.addEventListener("resize", checkWidth);
	// 	return () => {
	// 		window.removeEventListener("resize", checkWidth);
	// 	};
	// }, []);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#classes-header`} onScreen={onScreen_Classes} topLevelLink={true}>
						Classes
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#classes-USpawnArea`}
								onScreen={onScreen_Classes && onScreen_USpawnArea}
							>
								Spawn Area
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-ATargetManager`}
								onScreen={onScreen_Classes && !onScreen_USpawnArea && onScreen_ATargetManager}
							>
								Target Manager
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#classes-UBoxComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_USpawnArea &&
											onScreen_ATargetManager &&
											onScreen_UBoxComponent
										}
									>
										Box Components
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#classes-UReinforcementLearningComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_USpawnArea &&
											onScreen_ATargetManager &&
											!onScreen_UBoxComponent &&
											onScreen_UReinforcementLearningComponent
										}
									>
										Reinforcement Learning Component
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#classes-USpawnAreaManagerComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_USpawnArea &&
											onScreen_ATargetManager &&
											!onScreen_UReinforcementLearningComponent &&
											onScreen_USpawnAreaManagerComponent
										}
									>
										Spawn Area Manager Component
									</SidebarHashLink>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-ATarget`}
								onScreen={onScreen_Classes && !onScreen_ATargetManager && onScreen_ATarget}
							>
								Target
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#classes-UProjectileMovementComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_ATargetManager &&
											onScreen_ATarget &&
											onScreen_UProjectileMovementComponent
										}
									>
										Projectile Movement Component
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#classes-UBSAbilitySystemComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_ATargetManager &&
											onScreen_ATarget &&
											!onScreen_UProjectileMovementComponent &&
											onScreen_UBSAbilitySystemComponent
										}
									>
										Ability System Component
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#classes-UBSHealthComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_ATargetManager &&
											onScreen_ATarget &&
											!onScreen_UBSAbilitySystemComponent &&
											onScreen_UBSHealthComponent
										}
									>
										Health Component
									</SidebarHashLink>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-ABSGameMode`}
								onScreen={onScreen_Classes && !onScreen_ATarget && onScreen_ABSGameMode}
							>
								BSGameMode
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#states`}
						onScreen={!onScreen_Classes && onScreen_States}
						topLevelLink={true}
					>
						States
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#states-target`}
								onScreen={!onScreen_Classes && onScreen_States && onScreen_TargetStates}
							>
								Target States
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#states-spawn-area`}
								onScreen={
									!onScreen_Classes &&
									onScreen_States &&
									!onScreen_TargetStates &&
									onScreen_SpawnAreaStates
								}
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
						hash={`#target-lifecycle`}
						onScreen={!onScreen_TargetDistributionPolicy && onScreen_TargetLifeCycle}
						topLevelLink={true}
					>
						Target Lifecycle
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Initialization`}
								onScreen={
									!onScreen_TargetDistributionPolicy &&
									onScreen_TargetLifeCycle &&
									onScreen_Initialization
								}
							>
								Initialization
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Spawning`}
								onScreen={
									!onScreen_TargetDistributionPolicy &&
									onScreen_TargetLifeCycle &&
									!onScreen_Initialization &&
									onScreen_Spawning
								}
							>
								Spawning
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#target-lifecycle-Activation`}
								onScreen={
									!onScreen_TargetDistributionPolicy &&
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
									!onScreen_TargetDistributionPolicy &&
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
									!onScreen_TargetDistributionPolicy &&
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
						<div className="article-section" ref={Ref_Classes} id="classes-header">
							<BlogHeading headingText="Classes" headingLevel={1} />
							<p>
								This section gives a brief description of all classes involved in BeatShot&#39;s target
								spawning system and establishes the context needed for the next section.
							</p>
							<div className="article-subsection" ref={Ref_USpawnArea} id="classes-USpawnArea">
								<BlogHeadingClass
									baseClass="UObject"
									childClass="USpawnArea"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Public/Target/SpawnAreaManagerComponent.h"
								/>
								<p>
									The area where targets may spawn is represented as a two-dimensional spatial grid,
									or <em>total spawn area</em>. A Spawn Area is simply a piece of the spatial grid.
								</p>
								<p>When maxed out, the total spawn area represents 3.2 million individual points.</p>
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
							<div className="article-subsection" ref={Ref_ATargetManager} id="classes-ATargetManager">
								<BlogHeadingClass
									baseClass="AActor"
									childClass="ATargetManager"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Target/TargetManager.cpp"
								/>

								<ul>
									<p>
										The Target Manager is an actor that represents the highest level of the target
										spawning system. It has several responsibilities including:
									</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Spawning, activating, deactivating, and destroying targets
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Stores references to targets using a map based on the target’s GUID
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Managing the size of the total spawn area, which can change during a game mode
									</li>
								</ul>
								<p>
									This class delegates responsibilties to several components described in the
									following three sections.
								</p>
								<div
									className="article-subsection-2"
									ref={Ref_UBoxComponent}
									id="classes-UBoxComponent"
								>
									<BlogHeadingClass
										baseClass="UShapeComponent"
										childClass="UBoxComponent"
										compOf="ATargetManager"
										headingLevel={3}
										childClassLink="https://docs.unrealengine.com/5.3/en-US/API/Runtime/Engine/Components/UBoxComponent/"
									/>
									<p>
										The Target Manager uses seven box components that can all be considerd 2-D
										planes since one out of three dimensions is always zero.
									</p>
									<p>
										The first plane (middle red in Figure TODO) corresponds to the total spawn area,
										or the 2-D area encompassed by all Spawn Area objects.
									</p>
									<p>
										The other six form a rectangular prism (blue, green, front & back red planes in
										Figure TODO) used to confine moving targets. I would&#39;ve preferred to only
										use one box component, but &#34;hollow collision&#34; is not a thing. They form
										a closed volume, but are offset in Figure TODO for visiblity.
									</p>
									<figure>
										<div className="figure-border-container">
											<Image src={image_BoxBounds} alt="BoxBounds" />
											<figcaption>
												<p className="figlabel">Figure TODO: </p>
												Target Manager Box Components
											</figcaption>
										</div>
									</figure>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_UReinforcementLearningComponent}
									id="classes-UReinforcementLearningComponent"
								>
									<BlogHeadingClass
										baseClass="UActorComponent"
										childClass="UReinforcementLearningComponent"
										compOf="ATargetManager"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Target/ReinforcementLearningComponent.cpp"
									/>
									<p>
										The Reinforcement Learning Component (RL Component) is an opt-in option
										available to custom game modes (Enable AI).
									</p>
									<p>
										It uses the Q-Learning algorithm to find the target spawn location that the
										player is least likely to successfully destroy based on past performance.
									</p>
									<p>
										The component uses a 2-D array where each element in the array represents the
										reward from having spawned a target at location A and immediately spawning a
										target at location B. A simpler approach would be to only consider the reward
										for spawning a target a location B, but using the previous spawn location
										generates better predictions, even though it takes longer to train the model. It
										always scales the total spawn area down to a 5x5 grid, meaning that the 2-D
										array will always have 625 elements (the simpler approach would only have 25
										elements).
									</p>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_USpawnAreaManagerComponent}
									id="classes-USpawnAreaManagerComponent"
								>
									<BlogHeadingClass
										baseClass="UActorComponent"
										childClass="USpawnAreaManagerComponent"
										compOf="ATargetManager"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Target/SpawnAreaManagerComponent.cpp"
									/>
									<p>
										The Spawn Area Manager Component creates and manages all Spawn Area objects. It
										contains the logic for choosing where to spawn targets and which targets to
										activate.
									</p>
									<p>
										The Spawn Area Manager never interfaces directly with targets. To associate a
										target with a Spawn Area, the target’s Guid is mapped to the spawn area in which
										it resides. This means that there can only ever be one target per Spawn Area at
										a time.
									</p>
									<p>
										Spawn Areas must frequently be combined and filtered based on their current
										state. To facilitate this, I chose to store Spawn Areas in{" "}
										<BSInlineFunction>TSets</BSInlineFunction> so that I would have access to{" "}
										<BSInlineFunction>::Union</BSInlineFunction>,{" "}
										<BSInlineFunction>::Difference</BSInlineFunction>, and{" "}
										<BSInlineFunction>::Intersection</BSInlineFunction> functions. The elements in
										the set are hashed using the Spawn Area’s index.
									</p>
									<p>
										This component used to be part of the base Target Manager class, but as the
										class grew in size, it made sense to encapsulate all Spawn Area-related
										functions into a component.
									</p>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_ATarget} id="classes-ATarget">
								<BlogHeadingClass
									baseClass="AActor"
									childClass="ATarget"
									compOf="ATargetManager"
									compOfText="spawned by"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Target/Target.cpp"
								/>
								<p>
									The target is the only visible actor in the target spawning system (in the release
									build).
								</p>
								<p>
									A target may receive damage from a player or themself, in the case of timing out. In
									either case, it notifies the Target Manager when damage events occur. Targets
									control their color using curve assets and timelines. Similar to the Target Manager,
									this class uses components detailed in the following three sections.
								</p>
								<div
									className="article-subsection-2"
									ref={Ref_UProjectileMovementComponent}
									id="classes-UProjectileMovementComponent"
								>
									<BlogHeadingClass
										baseClass="UMovementComponent"
										childClass="UProjectileMovementComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://docs.unrealengine.com/5.3/en-US/API/Runtime/Engine/GameFramework/UProjectileMovementComponent/"
									/>
									<p>
										The Projectile Movement Component is used to automate moving targets. The Target
										Manager calls <BSInlineFunction>ATarget::SetTargetSpeed</BSInlineFunction> to
										change a target&#39;s speed, and{" "}
										<BSInlineFunction>ATarget::SetTargetDirection</BSInlineFunction> to change a
										target&#39;s velocity or direction.
									</p>
									<p>
										In order to retain the same velocity that a target had prior to bouncing into
										something,{" "}
										<BSInlineFunction>
											UProjectileMovementComponent::OnProjectileBounce
										</BSInlineFunction>{" "}
										is overriden.
									</p>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_UBSAbilitySystemComponent}
									id="classes-UBSAbilitySystemComponent"
								>
									<BlogHeadingClass
										baseClass="UAbilitySystemComponent"
										childClass="UBSAbilitySystemComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/BSAbilitySystemComponent.cpp"
									/>
									<p>
										It might&#39;ve been overkill to use this for each target, but it works well
										since characters also use the Ability System Component (ASC), enabling
										communication between their ASC and the target ASC.
									</p>
									<p>
										The ASC enables applying immunity to the target for the different damage types
										(and control them independently) and has built in support for tracking
										attributes like health.
									</p>
									<p>
										Sidenote: The ASC comes from the Gameplay Ability System plugin (GAS) by Unreal.
										I might do a seperate article covering more about GAS, but for now I&#39;ll only
										discuss the relvant parts.
									</p>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_UBSHealthComponent}
									id="classes-UBSHealthComponent"
								>
									<BlogHeadingClass
										baseClass="UActorComponent"
										childClass="UBSHealthComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Character/BSHealthComponent.cpp"
									/>
									<p>
										The health component is initialized with ability system component so that it can
										listen for changes to the health attribute of the target. The target binds the
										health component&#39;s OnHealthChanged delegate to its{" "}
										<BSInlineFunction>ATarget::OnHealthChanged</BSInlineFunction> function. If you
										aren&#39;t familiar with delegates, this just means that when the target health
										changes, the function will be called.
									</p>
									<p>
										The OnHealthChanged delegate has three parameters that are passed to the
										function:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The actor who instigated the damage
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The old value of the health attribute
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The new value of the health attribute
										</li>
									</ul>
									<p>
										With this configuration, the target knows if it was the actor who caused the
										damage event. This is important becuase the target damages itself if it expires.
									</p>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_ABSGameMode} id="classes-ABSGameMode">
								<BlogHeadingClass
									baseClass="AGameMode"
									childClass="ABSGameMode"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/BSGameMode.cpp"
								/>
								<p>
									The game mode spawns and intializes new Target Manager each time a game mode is
									started. It also configures the audio analyzer and notifies the Target Manager each
									time a beat threshold is met.
								</p>
							</div>
						</div>
						<div className="article-section" ref={Ref_States} id="states">
							<BlogHeading headingText="States" headingLevel={1} />
							<div className="article-subsection" ref={Ref_TargetStates} id="states-target">
								<BlogHeading headingText="Targets States" headingLevel={2} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<b>Activated</b>: target is damageable by the player and can be a variety of
										colors based on the current position in its lifetime
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
											notifies the Spawn Area Manager when targets are spawned, damaged, and/or
											change state. The Spawn Area Manager updates the state of Spawn Areas based
											on the information it receives from the Target Manager.
										</p>
										<p>
											Spawn Areas have more states than targets since they also keep track of
											where targets have been previously.
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
														: mapped target is activated, shown as green squares in Figure
														TODO
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
									If multiple conditions are specified, the condition that occurs first will trigger
									the deactivation/destruction.
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
															only target destruction condition, targets are deactivated
															when reaching 200, 100, and 0 health
														</li>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															If <BSInlineEnum>
																::OnSpecificHealthLost
															</BSInlineEnum> and{" "}
															<BSInlineEnum>::OnExpiration</BSInlineEnum> are target
															destruction conditions, targets are deactivated when
															reaching 200, 100, and 0 health when damaged by the player,
															but will be immediately destroyed if the player does not
															damage the target while activated
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
													Targets are deactivated when damaged by the player or when their
													maximum lifespan expires, whichever comes first
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<p>
									By combining both deactivation and destruction conditions, it becomes possible for a
									target to be reactivated numerous times if the player is able to damage it, while
									also immediately destroying it the first time they are not able to damage it while
									activated.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Responses} id="responses">
								<BlogHeading headingText="Responses" headingLevel={2} />
								<p>Responses specify what the target does when it reaches a certain state.</p>
								<ul>
									<p>There are three kinds of responses:</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetSpawnResponse</BSInlineEnum>: modification to apply to a
										target when spawned. Always applied and only happens once in a target&#39;s
										lifetime.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetActivationResponse</BSInlineEnum>: modification to apply to
										a target when activated. No restriction on how many times this may happen in a
										target&#39;s lifetime.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetDeactivationResponse</BSInlineEnum>: modification to apply
										to a target when deactivated. No restriction on how many times this may happen
										in a target&#39;s lifetime.
									</li>
								</ul>
								<p>
									Responses at each state in a target&#39;s lifecycle allow for modifications like
									target movement and target size changes to be applied only when activated, only when
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
												Since the spatial grid has fixed maximum dimensions and increment
												values, there will only ever be a maximum of 1280 Spawn Areas.
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
												Grid-based is a subset of Full-range, limited to one position within a
												Spawn Area.
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
							<div className="article-subsection" ref={Ref_Conclusion} id="conclusion">
								<BlogHeading headingText="Conclusion" headingLevel={1} />
								<p>
									Well, that was a lot. The system I described is by no means the only way to approach
									the problem, it&#39;s just the way that made sense to me and worked. I hoped you
									learned something and weren&#39;t too overwhelmed.
								</p>
							</div>
							<div className="article-subsection">
								<p className="inline posted-date">
									<span className="inline text-light">Posted:</span> July 2, 2023
									<br></br>
									<time dateTime="2023-12-23">
										<span className="inline text-light">Updated:</span> December 23, 2023
									</time>
								</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		</>
	);
};

export default TargetSpawningSystem;
