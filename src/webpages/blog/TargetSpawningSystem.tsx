"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import blogPostData from "@/components/blog/TargetSpawningSystemData";
import {
	ActivationResponses,
	DeactivationConditions,
	DeactivationResponses,
	DestructionConditions,
	SpawnResponses,
} from "@/components/blog/TargetSpawningSystemFunctions";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import { BSCodeBlock, BSInlineCode, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
import { DualImageCarousel } from "@/components/ImageCarousel";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import image_BeatGrid from "public/targetSpawningSystem/BeatGridDebug.jpg";
import image_BoxBounds from "public/targetSpawningSystem/BoxBounds.jpg";
import image_ClusterBeat from "public/targetSpawningSystem/ClusterBeatDebug.jpg";
import image_ClusterBeatLog1 from "public/targetSpawningSystem/ClusterBeatExampleLog1.png";
import image_ClusterBeatLog2 from "public/targetSpawningSystem/ClusterBeatExampleLog2.png";
import image_ClusterBeatLog3 from "public/targetSpawningSystem/ClusterBeatExampleLog3.png";
import image_GridBlockSpawning from "public/targetSpawningSystem/GridBlockSpawning.png";
import image_NonBeatGrid from "public/targetSpawningSystem/NonBeatGridDebug.jpg";
import image_Hero from "public/targetSpawningSystem/Part1Hero.jpg";
import image_SphereColorGradient from "public/targetSpawningSystem/SphereColorGradient.png";
import image_TotalSpawnArea from "public/targetSpawningSystem/TotalSpawnArea.jpg";

const TargetSpawningSystem = () => {
	const Ref_Classes = useRef(null);
	const Ref_USpawnArea = useRef(null);
	const Ref_ATargetManager = useRef(null);
	const Ref_UReinforcementLearningComponent = useRef(null);
	const Ref_USpawnAreaManagerComponent = useRef(null);
	const Ref_ATarget = useRef(null);
	const Ref_ABSGameMode = useRef(null);
	const Ref_States = useRef(null);
	const Ref_TargetStates = useRef(null);
	const Ref_SpawnAreaStates = useRef(null);
	const Ref_ConditionsAndResponses = useRef(null);
	const Ref_Conditions = useRef(null);
	const Ref_Responses = useRef(null);
	const Ref_TargetDistributionPolicy = useRef(null);
	const Ref_SpawnSelectionMode = useRef(null);
	const Ref_SpawnAreaSizing = useRef(null);
	const Ref_Conclusion = useRef(null);

	const onScreen_Classes = useOnScreen(Ref_Classes);
	const onScreen_USpawnArea = useOnScreen(Ref_USpawnArea);
	const onScreen_ATargetManager = useOnScreen(Ref_ATargetManager);
	const onScreen_UReinforcementLearningComponent = useOnScreen(Ref_UReinforcementLearningComponent);
	const onScreen_USpawnAreaManagerComponent = useOnScreen(Ref_USpawnAreaManagerComponent);
	const onScreen_ATarget = useOnScreen(Ref_ATarget);
	const onScreen_ABSGameMode = useOnScreen(Ref_ABSGameMode);
	const onScreen_States = useOnScreen(Ref_States);
	const onScreen_TargetStates = useOnScreen(Ref_TargetStates);
	const onScreen_SpawnAreaStates = useOnScreen(Ref_SpawnAreaStates);
	const onScreen_ConditionsAndResponses = useOnScreen(Ref_ConditionsAndResponses);
	const onScreen_Conditions = useOnScreen(Ref_Conditions);
	const onScreen_Responses = useOnScreen(Ref_Responses);
	const onScreen_TargetDistributionPolicy = useOnScreen(Ref_TargetDistributionPolicy);
	const onScreen_SpawnSelectionMode = useOnScreen(Ref_SpawnSelectionMode);
	const onScreen_SpawnAreaSizing = useOnScreen(Ref_SpawnAreaSizing);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

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
										hash={`#classes-USpawnAreaManagerComponent`}
										onScreen={
											onScreen_Classes &&
											!onScreen_USpawnArea &&
											onScreen_ATargetManager &&
											!onScreen_UReinforcementLearningComponent &&
											onScreen_USpawnAreaManagerComponent
										}
									>
										Spawn Area Manager
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
						hash={`#spawn-selection`}
						onScreen={!onScreen_TargetDistributionPolicy && onScreen_SpawnSelectionMode}
						topLevelLink={true}
					>
						Spawn Selection
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#spawn-area-sizing`}
						onScreen={!onScreen_SpawnSelectionMode && onScreen_SpawnAreaSizing}
						topLevelLink={true}
					>
						Spawn Area Sizing
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={!onScreen_SpawnAreaSizing && onScreen_Conclusion}
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
						<h1>{blogPostData.titleLong}</h1>
						<p className="hero-lead">{blogPostData.description}</p>
						<Image className="hero-image" priority src={image_Hero} quality={100} alt="logo" />
					</div>
				</div>
				<div className="flex-container-row">
					{sideBar}
					<article className="devblog-article flex-container-column" id="article">
						<p>
							This article explores the foundational elements of BeatShot&#39;s target spawning system. It
							provides an overview of the key classes involved, detailing their roles and the various
							states they can occupy. It also covers the reasoning behind the chosen conventions and their
							practical applications, while clarifying the boundaries between different systems and
							explaining the rationale for defining those boundaries.
						</p>
						<div className="article-section" ref={Ref_Classes} id="classes-header">
							<BlogHeading headingText="Classes" headingLevel={1} />
							<p>
								This section gives a brief description of all classes involved in BeatShot&#39;s target
								spawning system and establishes the context needed for the following sections.
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
									known as the total spawn area. A Spawn Area is simply a segment of this spatial
									grid.
								</p>
								<p>
									When fully utilized, the total spawn area represents 3.2 million individual points.
								</p>
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
										Stores references to targets using a map based on the target’s{" "}
										<BSInlineCode>FGuid</BSInlineCode> (globally unique identifier)
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Managing the size of the total spawn area, which can change during a game mode
									</li>
								</ul>
								<p>
									This class delegates responsibilities to several components described in the
									following three sections.
								</p>
								<div className="article-subsection-2" id="classes-UBoxComponent">
									<BlogHeadingClass
										baseClass="UShapeComponent"
										childClass="UBoxComponent"
										compOf="ATargetManager"
										headingLevel={3}
										childClassLink="https://docs.unrealengine.com/5.3/en-US/API/Runtime/Engine/Components/UBoxComponent/"
									/>
									<p>
										The Target Manager uses seven box components, which can all be considered
										two-dimensional planes since one of their three dimensions is always zero.
									</p>
									<p>
										The middle red plane in Figure 1 corresponds to the total spawn area, or the
										two-dimensional area encompassed by all Spawn Area objects.
									</p>
									<p>
										The other six components form a rectangular prism (blue, green, front & back red
										planes in Figure 1) used to confine moving targets. I would&#39;ve preferred to
										only use one box component, but &#34;hollow collision&#34; is not feasible. They
										form a closed volume but are offset in Figure 1 for visibility.
									</p>
									<Figure
										image={image_BoxBounds}
										figNumber={1}
										figCaption="Target Manager Box Components"
										alt="BoxBounds"
									/>
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
										The Reinforcement Learning Component is an optional feature available to custom
										game modes (<em>Enable AI</em>).
									</p>
									<p>
										It uses the Q-Learning algorithm to identify the target spawn locations that the
										player is least likely to successfully destroy, based on past performance.
									</p>
									<p>
										The component utilizes a two-dimensional array where each element in the array
										represents the reward from spawning a target at location A and subsequently
										spawning another target at location B. While a simpler approach could involve
										only considering the reward for spawning a target at one location, using the
										previous spawn location provides better predictions, even though it requires
										more training time. The array scales the total spawn area down to a 5x5 grid,
										resulting in 625 elements (as opposed to the 25 elements of the simpler
										approach).
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
										The Spawn Area Manager does not interface directly with targets. Instead, a
										target’s <BSInlineCode>FGuid</BSInlineCode> is mapped to the Spawn Area in which
										it resides, meaning that there can only be one target per Spawn Area at any
										given time.
									</p>
									<p>
										Spawn Areas must frequently be combined and filtered based on their current
										state. To facilitate this, I chose to store Spawn Areas in{" "}
										<BSInlineFunction>TSets</BSInlineFunction> to utilize{" "}
										<BSInlineFunction>::Union</BSInlineFunction>,{" "}
										<BSInlineFunction>::Difference</BSInlineFunction>, and{" "}
										<BSInlineFunction>::Intersection</BSInlineFunction> functions. The elements in
										the set are hashed using the Spawn Area’s index since a Spawn Area may reference
										different target <BSInlineCode>FGuid</BSInlineCode>s throughout its lifetime.
									</p>
									<p>
										This component was previously part of the base Target Manager class, but as the
										class grew, it made sense to encapsulate all Spawn Area-related functions into a
										separate component.
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
									A target may receive damage from a player or itself if it times out. In either case,
									it notifies the Target Manager when damage events occur. Targets control their color
									using curve assets and timelines. Like the Target Manager, this class uses
									components detailed in the following sections.
								</p>
								<div className="article-subsection-2" id="classes-UProjectileMovementComponent">
									<BlogHeadingClass
										baseClass="UMovementComponent"
										childClass="UProjectileMovementComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://docs.unrealengine.com/5.3/en-US/API/Runtime/Engine/GameFramework/UProjectileMovementComponent/"
									/>
									<p>
										The Projectile Movement Component automates target movement. The Target Manager
										calls <BSInlineFunction>ATarget::SetTargetSpeed</BSInlineFunction> to change a
										target&#39;s speed, and{" "}
										<BSInlineFunction>ATarget::SetTargetDirection</BSInlineFunction> to adjust a
										target&#39;s velocity or direction.
									</p>
									<p>
										To maintain the same velocity that a target had prior to bouncing into an
										obstacle,{" "}
										<BSInlineFunction>
											UProjectileMovementComponent::OnProjectileBounce
										</BSInlineFunction>{" "}
										is overridden.
									</p>
								</div>
								<div className="article-subsection-2" id="classes-UBSAbilitySystemComponent">
									<BlogHeadingClass
										baseClass="UAbilitySystemComponent"
										childClass="UBSAbilitySystemComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/BSAbilitySystemComponent.cpp"
									/>
									<p>
										Using the Ability System Component (ASC) for each target might seem excessive,
										but it integrates well since characters also use the ASC, allowing communication
										between their ASC and the target ASC.
									</p>
									<p>
										The ASC facilitates applying immunity to the target for different damage types
										and supports tracking attributes like health.
									</p>
									<p>
										To learn more about how the ASC (part of the Gameplay Ability System plugin in
										Unreal Engine) is used in BeatShot, check out the{" "}
										<Link
											className="text-light hover-white"
											href="/devblog/gameplay-ability-system-overview"
										>
											Gameplay Ability System Overview article
										</Link>
										.
									</p>
								</div>
								<div className="article-subsection-2" id="classes-UBSHealthComponent">
									<BlogHeadingClass
										baseClass="UActorComponent"
										childClass="UBSHealthComponent"
										compOf="ATarget"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Character/BSHealthComponent.cpp"
									/>
									<p>
										The health component is initialized with Ability System Component so that it can
										monitor for changes to the target&#39;s health attribute. The target binds the
										health component&#39;s <BSInlineCode>FBSDamageEvent</BSInlineCode> delegate to
										its <BSInlineFunction>::HandleDamageEvent</BSInlineFunction> function. If you
										aren&#39;t familiar with delegates, this means that when the target takes
										damage, the function will be triggered.
									</p>
									<p>
										The <BSInlineCode>FBSDamageEvent</BSInlineCode> delegate passes an{" "}
										<BSInlineCode>FDamageEventData</BSInlineCode> structure containing the following
										data:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The actor who instigated the damage
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The type of damage taken
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The old value of the health attribute
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The new value of the health attribute
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />A pointer to the{" "}
											<BSInlineCode>FGameplayEffectSpec</BSInlineCode>
										</li>
									</ul>
									<p>
										With this setup, the target can identify if it was the actor who caused the
										damage event. This is crucial because the target damages itself if it expires.
										The <BSInlineCode>FGameplayEffectSpec</BSInlineCode> pointer allows receivers of
										this structure to query the Effect Spec&#39;s dynamic asset tags.
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
									The game mode spawns the Target Manager when the map loads. It initializes the
									Target Manager each time a game mode starts. It also configures the audio analyzer
									and notifies the Target Manager whenever a beat threshold is met.
								</p>
							</div>
						</div>
						<div className="article-section" ref={Ref_States} id="states">
							<BlogHeading headingText="States" headingLevel={1} />
							<div className="article-subsection" ref={Ref_TargetStates} id="states-target">
								<BlogHeading headingText="Targets States" headingLevel={2} />
								<p>Targets can be in one of two states:</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<b>Activated</b>: The target is damageable by the player and can be displayed in
										various colors based on its current lifetime position.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<span className="text-purple">
											<b>Deactivated</b>
										</span>
										: The target is not damageable by the player and is shown as purple in Figure 3.
									</li>
								</ul>
								<div className="padding-top-05rem">
									<Figure
										image={image_SphereColorGradient}
										figNumber={2}
										figCaption={`Activated target colors`}
										alt="ActivatedTargetColors"
									/>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_SpawnAreaStates} id="states-spawn-area">
								<BlogHeading headingText="Spawn Area States" headingLevel={2} />
								<div className="article-section-row">
									<div className="div-50" id="">
										<p>
											Spawn Areas essentially function as data containers. The Target Manager
											notifies the Spawn Area Manager when targets are spawned, damaged, or when
											their state changes. The Spawn Area Manager updates the state of Spawn Areas
											based on the information it receives from the Target Manager.
										</p>
										<p>
											Spawn Areas have more states than targets because they also track where
											targets have been previously:
										</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<b>Managed</b>: Mapped to a spawned target and can be either activated
												or deactivated. All visible targets are managed.
												<ul>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														<span className="text-green">
															<b>Activated</b>
														</span>
														: The mapped target is activated, shown as green squares in
														Figure 3.
													</li>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														<span className="text-red">Deactivated</span>: The mapped target
														is deactivated, shown as red squares in Figure 3.
													</li>
												</ul>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<span className="text-light">
													<b>Recent</b>
												</span>
												: Does not reference a target and is not valid for spawning or
												activation, shown as light blue squares in Figure 3.
											</li>
										</ul>
									</div>
									<div className="div-50">
										<Figure
											image={image_ClusterBeat}
											figNumber={3}
											figCaption="The ClusterBeat game mode showing various Target and Spawn Area states"
											alt="ClusterBeatStates"
										/>
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
									<p>Conditions dictate how long a target remains relevant and come in two forms:</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetDeactivationCondition</BSInlineEnum>: An event that
										triggers a target to transition from activated to deactivated.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetDestructionCondition</BSInlineEnum>: An event that causes
										the target to be destroyed by the Target Manager, regardless of its current
										state.
									</li>
								</ul>
								<p>
									If multiple conditions are specified, the condition that occurs first will trigger
									either deactivation or destruction.
								</p>
								<div className="static-article-section-row">
									<BSCodeBlock style={{ overflowX: "auto" }}>{DeactivationConditions}</BSCodeBlock>
									<BSCodeBlock style={{ overflowX: "auto" }}>{DestructionConditions}</BSCodeBlock>
								</div>
								<div className="article-subsection-2" id="">
									<BlogHeading headingText="Examples" headingLevel={3} />
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineEnum>::OnSpecificHealthLoss</BSInlineEnum> as the only{" "}
											<em>Deactivation Condition</em>:
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													<em>Health Loss Required for Deactivation</em> = 100,{" "}
													<em>Maximum Target Health</em> = 300
													<ul>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															If <BSInlineEnum>::OnHealthReachedZero</BSInlineEnum> is the
															only <em>Target Destruction Condition</em>, targets are
															deactivated at health levels of 200, 100, and 0.
														</li>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															If <BSInlineEnum>
																::OnSpecificHealthLost
															</BSInlineEnum> and{" "}
															<BSInlineEnum>::OnExpiration</BSInlineEnum> are{" "}
															<em>Target Destruction Conditions</em>, targets are
															deactivated at health levels of 200, 100, and 0 when damaged
															by the player but will be immediately destroyed if the
															player fails to damage the target while it is activated.
														</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineEnum>::OnAnyExternalDamageTaken</BSInlineEnum> and{" "}
											<BSInlineEnum>::OnExpiration</BSInlineEnum> as{" "}
											<em>Deactivation Conditions</em>:
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Targets are deactivated when damaged by the player or when their
													maximum lifespan expires, whichever comes first.
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<p>
									Combining both deactivation and destruction conditions allows for a target to be
									reactivated multiple times if the player successfully damages it, while also
									ensuring immediate destruction if the player fails to damage it during activation.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Responses} id="responses">
								<BlogHeading headingText="Responses" headingLevel={2} />
								<p>
									Responses specify what a target does when it reaches a certain state. There are
									three kinds of responses:
								</p>
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetSpawnResponse</BSInlineEnum>: Modification applied to a
										target when it spawns. This is always applied and occurs only once in a
										target&#39;s lifetime.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetActivationResponse</BSInlineEnum>: Modification applied to
										a target when it is activated. There is no restriction on how many times this
										can occur in a target&#39;s lifetime.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineEnum>ETargetDeactivationResponse</BSInlineEnum>: Modification applied
										to a target when it is deactivated. There is no restriction on how many times
										this can occur in a target&#39;s lifetime.
									</li>
								</ul>
								<p>
									Responses at each state in a target&#39;s lifecycle allow for modifications such as
									target movement and size changes to be applied only when activated, only when
									deactivated, both, or neither. When a target is destroyed, deactivation responses
									are always applied.
								</p>
								<div className="static-article-section-row padding-top-05rem">
									<div className="div-50 overflow-x-auto">
										<BSCodeBlock className="overflow-x-auto">{SpawnResponses}</BSCodeBlock>
										<BSCodeBlock className="overflow-x-auto">{ActivationResponses}</BSCodeBlock>
									</div>
									<BSCodeBlock className="div-50 overflow-x-auto">
										{DeactivationResponses}
									</BSCodeBlock>
								</div>
							</div>
						</div>
						<div className="article-section" ref={Ref_TargetDistributionPolicy} id="target-distribution">
							<BlogHeading headingText="Target Distribution Policy" headingLevel={1} />
							<p>
								The <em>Target Distribution Policy</em> determines how targets are distributed within
								the total spawn area and individual Spawn Areas. A target does not need to fit inside
								the Spawn Area it is associated with.
							</p>
							<div className="article-subsection" id="">
								<div className="static-article-section-row">
									<div className="div-50">
										<BlogHeading headingText="Full Range" headingLevel={2} />
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												Targets can spawn anywhere within the Spawn Area.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The Spawn Area size is always 50x50.
												<ul>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														This is primarily because 50x50 accommodates the smallest
														possible target size option.
													</li>
												</ul>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												Since the spatial grid has fixed maximum dimensions and increment
												values, there will always be a maximum of 1280 Spawn Areas.
											</li>
										</ul>
									</div>
									<div className="div-50">
										<BlogHeading headingText="Grid" headingLevel={2} />
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												Targets always spawn at the bottom-left vertex of the Spawn Area.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The Spawn Area size is based on the number of targets, target size, and
												grid spacing.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<BSInlineEnum>::Grid</BSInlineEnum> is a subset of{" "}
												<BSInlineEnum>::FullRange</BSInlineEnum>, limited to one specific
												position within a Spawn Area.
											</li>
										</ul>
									</div>
								</div>
								<div className="static-article-section-row">
									<div className="div-50">
										<Figure
											image={image_NonBeatGrid}
											figNumber={4}
											figCaption={
												<>
													<BSInlineEnum>::FullRange</BSInlineEnum> (Spawn Area size: 50x50)
												</>
											}
											alt="Full-range"
										/>
									</div>
									<div className="div-50">
										<Figure
											image={image_BeatGrid}
											figNumber={5}
											figCaption={
												<>
													<BSInlineEnum>::Grid</BSInlineEnum> (Spawn Area size: 145x145)
												</>
											}
											alt="Grid-Based"
										/>
									</div>
								</div>
								<p className="padding-top-05rem">
									<BSInlineEnum>::HeadshotHeightOnly</BSInlineEnum> and{" "}
									<BSInlineEnum>::EdgeOnly</BSInlineEnum> are the other two types of{" "}
									<em>Target Distribution Policies</em>. Similar to{" "}
									<BSInlineEnum>::Grid</BSInlineEnum>, they are also subsets of{" "}
									<BSInlineEnum>::FullRange</BSInlineEnum> but have much simpler implementations.
								</p>
							</div>
						</div>
						<div className="article-section" ref={Ref_SpawnSelectionMode} id="spawn-selection">
							<BlogHeading headingText="Spawn Selection" headingLevel={1} />
							<ul>
								<p>
									The <em>Spawn Selection</em> setting determines where to spawn targets for game
									modes that use a <BSInlineEnum>::Grid</BSInlineEnum>{" "}
									<em>Target Distribution Policy</em> and a <BSInlineEnum>::RuntimeOnly</BSInlineEnum>{" "}
									<em>Target Spawning Policy</em>. There are currently four implemented modes:
								</p>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::Random</BSInlineEnum>: Randomly chooses an available Spawn Area.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::Bordering</BSInlineEnum>: Chooses a random bordering Spawn Area
									based on recent Spawn Areas.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::RandomGridBlock</BSInlineEnum>: Chooses a random block of targets.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::NearbyGridBlock</BSInlineEnum>: Chooses a nearby block of targets
									based on recent Spawn Areas.
								</li>
							</ul>
							<p>
								<em>Batch spawning</em> is a setting that causes targets to only spawn when there no
								more managed targets are left to activate. <em>Batch spawning</em> combined with{" "}
								<BSInlineEnum>::RandomGridBlock</BSInlineEnum> or{" "}
								<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> creates a synergistic interaction used to
								create the ClusterBeat game mode, as shown in Figure 6.
							</p>
							<div className="padding-top-05rem padding-bottom-05rem">
								<Figure
									image={image_GridBlockSpawning}
									figNumber={6}
									figCaption={
										<>
											ClusterBeat game mode with 25 targets spawned at a time using{" "}
											<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> and batch spawning
										</>
									}
									alt="ClusterBeat with Batch Spawning"
								/>
							</div>
							<p>
								When implementing the <em>Spawn Selection</em> setting, I created a console command to
								log a matrix visualizing Spawn Area states. The numbers correspond to each Spawn Area
								index and indicate a valid spawn location, while underscores indicates that the Spawn
								Area is not a valid spawn location. Figure 7 shows the console output corresponding to
								Figure 6.
							</p>
							<div className="padding-top-05rem padding-bottom-05rem">
								<Figure
									image={image_ClusterBeatLog1}
									figNumber={7}
									figCaption={`Console output visualizing Spawn Area states`}
									alt="Spawn Area State Visualization"
								/>
							</div>
							<p>
								The light-blue dashed boxes indicate where the two previous grid blocks spawned, and
								each Spawn Area in these boxes are flagged as recent. The green dashed box represents
								the largest rectangle found, while the purple dashed box shows the grid block that was
								chosen.
							</p>
							<p>
								<BSInlineEnum>::RandomGridBlock</BSInlineEnum> and{" "}
								<BSInlineEnum>::NearbyGridBlock</BSInlineEnum> attempt to spawn groups of targets in the
								most compact arrangement possible using the following procedure:
							</p>
							<ol>
								<li>
									Compute all possible dimensions for the grid block. For example, groups of 25
									targets have dimensions or factors of 5x5 and 1x25.
								</li>
								<li>
									Use a modified version of the Largest Rectangle in a Histogram algorithm to identify
									rectangles that can accommodate any of the grid block dimensions found earlier.
								</li>
								<li>
									After obtaining the rectangles, select one that fits a grid block with dimensions
									having the smallest differences between them. This heuristic ensures the most
									compact arrangement.
								</li>
								<li>
									Once the rectangle is chosen, determine the location and orientation of the grid
									block within the rectangle. For NearbyGridBlock, it will attempt to select a
									location that borders a recent Spawn Area.
								</li>
							</ol>
							<p>
								Figure 8 illustrates that sometimes the absolute largest rectangle does not accommodate
								the desired target formation. Figure 8.1 shows that the absolute largest rectangle could
								only fit a 1x25 grid block. Figure 8.2 shows why multiple rectangles are considered,
								prioritizing those that can fit more compact grid blocks.
							</p>
							<div className="padding-top-05rem">
								<DualImageCarousel
									images={[
										{
											image: image_ClusterBeatLog2,
											figNumber: 8.1,
											caption: "The largest rectangle of valid Spawn Areas.",
											alt: "Largest Rectangle",
											buttonText: "Largest",
										},
										{
											image: image_ClusterBeatLog3,
											figNumber: 8.2,
											caption:
												"The largest rectangles of valid Spawn Areas that can fit a 5x5 grid block.",
											alt: "Optimal Rectangle",
											buttonText: "Optimal",
										},
									]}
								/>
							</div>
						</div>
						<div className="article-section" ref={Ref_SpawnAreaSizing} id="spawn-area-sizing">
							<BlogHeading headingText="Spawn Area Sizing" headingLevel={1} />
							<ul>
								<p>
									The <em>Bounds Scaling Policy</em> determines how to change the total spawn area
									size throughout the game mode. There are two types:
								</p>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::Static</BSInlineEnum>: The total spawn area size does not change.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									<BSInlineEnum>::Dynamic</BSInlineEnum>: The total spawn area size shrinks or grows
									based on the number of targets consecutively hit.
								</li>
							</ul>
							<p>
								If the <em>Bounds Scaling Policy</em> is <BSInlineEnum>::Dynamic</BSInlineEnum>, the
								Target Manager interpolates the current size of the total spawn area between the{" "}
								<em>Minimum Spread</em> and <em>Maximum Spread</em> for each direction (Horizontal,
								Vertical, and Forward). The spread is calculated using the current number of
								consecutively hit targets, the <em>Start Threshold</em>, and the <em>End Threshold</em>.
								The spread value is then rounded down to the nearest multiple of a Spawn Area, and the
								Spawn Area Manager updates the state of the Spawn Areas that are within the current
								total spawn area. The red Spawn Areas shown in Figure 9 are those outside of the current
								total spawn area.
							</p>
							<div className="padding-top-05rem">
								<Figure
									image={image_TotalSpawnArea}
									figNumber={9}
									figCaption={`The current total spawn area inside the total spawn area`}
									alt="TotalSpawnArea"
								/>
							</div>
						</div>
						<div className="article-section" ref={Ref_Conclusion} id="conclusion">
							<BlogHeading headingText="Conclusion" headingLevel={1} />
							<p>
								The system I have described is by no means the only way to approach the problem; it is
								simply the method that made the most sense to me and worked effectively. I hoped you
								learned something and weren&#39;t too overwhelmed. Part 2 of the Target Spawning System
								series builds upon the classes and conventions introduced here, as key functions and
								their roles are outlined throughout the target lifecycle.
							</p>
						</div>
						<h3 className="text-center">
							<Link
								className="link text-light hover-white"
								href={"/devblog/target-spawning-system-part-2"}
							>
								Check out Part 2 here!
							</Link>
						</h3>
						<ArticleDateFooter postDate={blogPostData.postDate} editDate={blogPostData.editDate} />
					</article>
				</div>
			</div>
		</>
	);
};

export default TargetSpawningSystem;
