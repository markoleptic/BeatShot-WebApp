"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import { BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import image_BoxBounds from "public/targetSpawningSystem/BoxBounds.png";
import image_Hero from "public/targetSpawningSystem/SpawnMemory_Hero_Cropped.png";
import image_Card from "public/targetSpawningSystem/TargetSpawningSystemCard.png";
import image_TotalSpawnArea from "public/targetSpawningSystem/TotalSpawnArea.png";

import type { BlogPostData } from "@/types/blog.types";
const titleShort = "BeatShot's Target Spawning System: Part 1 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 1 - Core Classes and Conventions";
const description =
	"In this first part of the series, you’ll learn about the classes, state management systems, and some of the " +
	"conventions used to make the game function smoothly, alongside insights into the decision-making process that " +
	"guided their selection and implementation.";
const postDate: DateTime = DateTime.fromFormat("July 2, 2023", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 14, 2024", "DDD");

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
						hash={`#conclusion`}
						onScreen={!onScreen_Classes && onScreen_Conclusion}
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
							TODO: I wrote this article with the goal that the reader doesn&#39;t need to understand C++
							to grasp the main concepts that BeatShot uses in its target spawning system.
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
									or <em>total spawn area</em>. A Spawn Area is simply a piece of the spatial grid.
								</p>
								<p>When maxed out, the total spawn area represents 3.2 million individual points.</p>
								<Figure
									image={image_TotalSpawnArea}
									figNumber={0}
									figCaption="Individual Spawn Areas making up the total spawn area"
									alt="TotalSpawnArea"
								/>
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
									This class delegates responsibilities to several components described in the
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
										The Target Manager uses seven box components that can all be considered 2-D
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
										a closed volume, but are offset in Figure TODO for visibility.
									</p>
									<Figure
										image={image_BoxBounds}
										figNumber={0}
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
									A target may receive damage from a player or itself, in the case of timing out. In
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
										is overridden.
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
										I might do a separate article covering more about GAS, but for now I&#39;ll only
										discuss the relevant parts.
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
										damage event. This is important because the target damages itself if it expires.
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
									The game mode spawns and initializes new Target Manager each time a game mode is
									started. It also configures the audio analyzer and notifies the Target Manager each
									time a beat threshold is met.
								</p>
							</div>
						</div>
						<div className="article-section" ref={Ref_Conclusion} id="conclusion">
							<BlogHeading headingText="Conclusion" headingLevel={1} />
							<p>
								The system I described is by no means the only way to approach the problem, it&#39;s
								just the way that made sense to me and worked. I hoped you learned something and
								weren&#39;t too overwhelmed. Part 2 of the Target Spawning System series TODO.
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
						<div className="article-section">
							<p className="inline posted-date">
								<span className="inline text-light">Posted: </span>
								{postDate.toFormat("DDD")}
								<br></br>
								<time dateTime={editDate.toHTTP() as string}>
									<span className="inline text-light">Updated: </span>
									{editDate.toFormat("DDD")}
								</time>
							</p>
						</div>
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

export { TargetSpawningSystem, blogPostData };
