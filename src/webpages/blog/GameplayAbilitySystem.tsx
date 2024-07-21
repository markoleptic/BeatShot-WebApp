"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import BlueprintGraph from "@/components/BlueprintGraph";
import { BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Codeblock.scss";
import "@/styles/Hero.scss";

import image_Card from "public/gameplayAbilitySystem/Card.jpg";
import DA_InputConfig from "public/gameplayAbilitySystem/DA_InputConfig.png";
import DA_KnifeAbilitySet from "public/gameplayAbilitySystem/DA_KnifeAbilitySet.png";
import image_Hero from "public/gameplayAbilitySystem/Hero.jpg";

import type { BlogPostData } from "@/types/blog.types";
const titleShort = "GAS in BeatShot | Developer Blog";
const titleLong = "An Overview of Unreal's Gameplay Ability System in BeatShot";
const description =
	"Why is the Gameplay Ability System used in BeatShot? This article explains the role of GAS and " +
	"provides a walkthrough of a common ability.";
const postDate: DateTime = DateTime.fromFormat("September 15, 2023", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 14, 2024", "DDD");

const GameplayAbilitySystem = () => {
	const Ref_gasC = useRef(null);
	const Ref_gasC_asc = useRef(null);
	const Ref_gasC_ga = useRef(null);
	const Ref_gasC_at = useRef(null);
	const Ref_gasC_asb = useRef(null);
	const Ref_gasC_ge = useRef(null);
	const Ref_gasC_ge_tarImm = useRef(null);
	const Ref_gasC_ge_fireCD = useRef(null);
	const Ref_gasC_as = useRef(null);
	const Ref_gasC_eic = useRef(null);
	const Ref_gasC_eic_ic = useRef(null);
	const Ref_gasC_dec = useRef(null);
	const Ref_gasC_hc = useRef(null);
	const Ref_tl = useRef(null);
	const Ref_tl_input = useRef(null);
	const Ref_tl_aa = useRef(null);
	const Ref_tl_aa_st = useRef(null);
	const Ref_tl_aa_otdrc = useRef(null);
	const Ref_tl_aa_otdr = useRef(null);
	const Ref_tl_gc = useRef(null);
	const Ref_tl_gc_wf = useRef(null);
	const Ref_tl_geApp = useRef(null);
	const Ref_tl_geApp_agets = useRef(null);
	const Ref_tl_geApp_ege = useRef(null);
	const Ref_conclusion = useRef(null);

	const onScreen_gasC = useOnScreen(Ref_gasC);
	const onScreen_gasC_asc = useOnScreen(Ref_gasC_asc);
	const onScreen_gasC_at = useOnScreen(Ref_gasC_at);
	const onScreen_gasC_ga = useOnScreen(Ref_gasC_ga);
	const onScreen_gasC_asb = useOnScreen(Ref_gasC_asb);
	const onScreen_gasC_ge = useOnScreen(Ref_gasC_ge);
	const onScreen_gasC_as = useOnScreen(Ref_gasC_as);
	const onScreen_gasC_eic = useOnScreen(Ref_gasC_eic);
	const onScreen_gasC_eic_ic = useOnScreen(Ref_gasC_eic_ic);
	const onScreen_gasC_dec = useOnScreen(Ref_gasC_dec);
	const onScreen_gasC_hc = useOnScreen(Ref_gasC_hc);
	const onScreen_tl = useOnScreen(Ref_tl);
	const onScreen_tl_input = useOnScreen(Ref_tl_input);
	const onScreen_tl_aa = useOnScreen(Ref_tl_aa);
	const onScreen_tl_aa_st = useOnScreen(Ref_tl_aa_st);
	const onScreen_tl_aa_otdrc = useOnScreen(Ref_tl_aa_otdrc);
	const onScreen_tl_aa_otdr = useOnScreen(Ref_tl_aa_otdr);
	const onScreen_tl_gc = useOnScreen(Ref_tl_gc);
	const onScreen_tl_gc_wf = useOnScreen(Ref_tl_gc_wf);
	const onScreen_ge_tarImm = useOnScreen(Ref_gasC_ge_tarImm);
	const onScreen_ge_fireCD = useOnScreen(Ref_gasC_ge_fireCD);
	const onScreen_tl_geApp = useOnScreen(Ref_tl_geApp);
	const onScreen_tl_geApp_agets = useOnScreen(Ref_tl_geApp_agets);
	const onScreen_tl_geApp_ege = useOnScreen(Ref_tl_geApp_ege);
	const onScreen_conclusion = useOnScreen(Ref_conclusion);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#gas-classes`} onScreen={onScreen_gasC} topLevelLink={true}>
						Classes
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#classes-UAbilitySystemComponent`}
								onScreen={onScreen_gasC && onScreen_gasC_asc}
							>
								Ability System Component
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UAbilityTask`}
								onScreen={onScreen_gasC && onScreen_gasC_at && !onScreen_gasC_asc}
							>
								Ability Task
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UGameplayAbility`}
								onScreen={onScreen_gasC && !onScreen_gasC_at && onScreen_gasC_ga}
							>
								Gameplay Abilities
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UBSAttributeSetBase`}
								onScreen={!onScreen_gasC_at && !onScreen_gasC_ga && onScreen_gasC_asb}
							>
								Attribute Set
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#gameplay-effects`}
								onScreen={!onScreen_gasC_asb && onScreen_gasC_ge}
							>
								Gameplay Effects
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#ge-infinite`}
										onScreen={!onScreen_gasC_asb && onScreen_gasC_ge && onScreen_ge_tarImm}
									>
										Target Immunity
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#fire-cooldown`}
										onScreen={
											!onScreen_gasC_asb &&
											onScreen_gasC_ge &&
											!onScreen_ge_tarImm &&
											onScreen_ge_fireCD
										}
									>
										Fire Gun Cooldown
									</SidebarHashLink>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UBSInputComponent`}
								onScreen={!onScreen_gasC_ge && onScreen_gasC_eic}
							>
								Enhanced Input Component
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#classes-UBSInputConfig`}
										onScreen={!onScreen_gasC_ge && onScreen_gasC_eic && onScreen_gasC_eic_ic}
									>
										Input Config
									</SidebarHashLink>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UBSAbilitySet`}
								onScreen={!onScreen_gasC_ge && !onScreen_gasC_eic && onScreen_gasC_as}
							>
								Ability Set
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UBSDamageExecCalc`}
								onScreen={!onScreen_gasC_eic && !onScreen_gasC_as && onScreen_gasC_dec}
							>
								Damage Exec Calc
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#classes-UBSHealthComponent`}
								onScreen={!onScreen_gasC_dec && onScreen_gasC_hc}
							>
								Health Component
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink hash={`#timeline`} onScreen={!onScreen_gasC && onScreen_tl} topLevelLink={true}>
						Timeline
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#timeline-Input`}
								onScreen={!onScreen_gasC && onScreen_tl && onScreen_tl_input}
							>
								Input
							</SidebarHashLink>
						</li>
						<li>
							<SidebarHashLink
								hash={`#timeline-AbilityActivation`}
								onScreen={onScreen_tl && !onScreen_tl_input && onScreen_tl_aa}
							>
								Ability Activation
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#timeline-StartTargeting`}
										onScreen={
											onScreen_tl && !onScreen_tl_input && onScreen_tl_aa && onScreen_tl_aa_st
										}
									>
										Start Targeting
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#timeline-OnTargetDataReadyCallback`}
										onScreen={
											onScreen_tl && onScreen_tl_aa && !onScreen_tl_aa_st && onScreen_tl_aa_otdrc
										}
									>
										On Target Data Ready Callback
									</SidebarHashLink>
								</li>
								<li>
									<SidebarHashLink
										hash={`#timeline-OnTargetDataReady`}
										onScreen={
											onScreen_tl &&
											onScreen_tl_aa &&
											!onScreen_tl_aa_st &&
											!onScreen_tl_aa_otdrc &&
											onScreen_tl_aa_otdr
										}
									>
										On Target Data Ready
									</SidebarHashLink>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#timeline-ApplyingTheGE`}
								onScreen={onScreen_tl && !onScreen_tl_aa && onScreen_tl_geApp}
							>
								GE Application
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#timeline-ApplyGESpectoSelf`}
										onScreen={
											onScreen_tl &&
											!onScreen_tl_aa &&
											onScreen_tl_geApp &&
											onScreen_tl_geApp_agets
										}
									>
										Apply GESpec to Self
									</SidebarHashLink>
									<ul>
										<li>
											<SidebarHashLink
												hash={`#timeline-ExecuteGameplayEffect`}
												onScreen={
													onScreen_tl &&
													!onScreen_tl_aa &&
													onScreen_tl_geApp &&
													onScreen_tl_geApp_agets &&
													onScreen_tl_geApp_ege
												}
											>
												Execute Gameplay Effect
											</SidebarHashLink>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<SidebarHashLink
								hash={`#timeline-GameplayCues`}
								onScreen={onScreen_tl && !onScreen_tl_geApp && onScreen_tl_gc}
							>
								Gameplay Cues
							</SidebarHashLink>
							<ul>
								<li>
									<SidebarHashLink
										hash={`#timeline-GCNWeaponFire`}
										onScreen={
											onScreen_tl && !onScreen_tl_geApp && onScreen_tl_gc && onScreen_tl_gc_wf
										}
									>
										Weapon Fire
									</SidebarHashLink>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={!onScreen_tl && onScreen_conclusion}
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
						<h1>An Overview of Unreal&#39;s Gameplay Ability System in BeatShot</h1>
						<p className="hero-lead">
							How is the Gameplay Ability System used in BeatShot? This article shows the implementation
							and walks through the execution of a common ability.
						</p>
						<Image className="hero-image" priority src={image_Hero} quality={100} alt="logo" />
					</div>
				</div>
				<div className="flex-container-row">
					{sideBar}
					<article className="devblog-article flex-container-column" id="article">
						<p>
							From the{" "}
							<Link
								className=""
								href={
									"https://docs.unrealengine.com/5.2/en-US/gameplay-ability-system-for-unreal-engine/"
								}
							>
								Unreal Engine Docs
							</Link>
							:
						</p>
						<blockquote className="otro-blockquote">
							The Gameplay Ability System is a framework for building attributes, abilities, and
							interactions that an Actor can own and trigger. The system is designed to be adapted to a
							wide variety of Gameplay-Driven projects such as Role-Playing Games(RPGs), Action-Adventure
							games, and Multiplayer Online Battle Arenas games(MOBA). Using this system, you can create
							abilities like a single attack, or add more complexity like a spell that triggers many
							status effects depending on data from the user and the targets.
						</blockquote>
						<p>
							It might not sound like the Gameplay Ability System (GAS) has a reason to be in BeatShot.
							Shooting a weapon could have easily been accomplished without a framework, and it was that
							way at first. However, I wanted to learn how an ability system worked in a game engine. GAS
							is a massive framework that was overwhelming at first. To make it less so, I narrowed my
							focus to a single goal: to create an ability for firing a weapon. After I completed this, I
							began to form a decent understanding of how the different classes worked together, which led
							to other abilities.
						</p>
						<p>
							This article lays out exactly how I&#39;ve implemented GAS in BeatShot. I&#39;ve tried to be
							thorough so that recreating it would be as easy as possible. The{" "}
							<Link href={"#gas-classes"}>first section</Link> gives an overview of any classes I created
							and their purpose. The titles of each section are links that take you to the code on GitHub.
							The <Link href={"#timeline"}>second section</Link> provides a detailed timeline showing what
							actually happens during the game when a player shoots a weapon using the Fire Gun Ability.
						</p>
						<p>
							I learned much of what I know about GAS from the{" "}
							<Link
								className="link text-light hover-white"
								href={"https://docs.unrealengine.com/5.3/en-US/lyra-sample-game-in-unreal-engine/"}
							>
								Lyra Sample Project
							</Link>{" "}
							and the incredible{" "}
							<Link
								className="link text-light hover-white"
								href={"https://github.com/tranek/GASDocumentation"}
							>
								GASDocumentation
							</Link>
							. I&#39;m not looking to do the same thing here but instead show an example implementation
							and execution.
						</p>
						<div className="article-section" ref={Ref_gasC} id="gas-classes">
							<BlogHeading headingText="GAS Classes" headingLevel={1} />
							<p>
								Many of the classes that are part of GAS are meant to be subclassed in C++. In this
								section, I&#39;ll introduce each class that BeatShot either overrides or uses.
							</p>
							<p>
								Note: The last five classes (
								<Link href={"#classes-UBSInputComponent"}>UBSInputComponent</Link> through{" "}
								<Link href={"#classes-UBSHealthComponent"}>UBSHealthComponent</Link>) are <b>NOT</b>{" "}
								required for base GAS functionality, but provide enough benefit to warrant using them.
							</p>
							<div className="article-subsection" ref={Ref_gasC_asc} id="classes-UAbilitySystemComponent">
								<BlogHeadingClass
									baseClass="UAbilitySystemComponent"
									childClass="UBSAbilitySystemComponent"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/BSAbilitySystemComponent.cpp"
								/>
								<p>
									The Ability System Component (ASC) is added to any actor that wants to interact with
									GAS. For BeatShot, the only actors that have ASCs are the character and targets.
								</p>
								<ul>
									<p>
										In my implementation, the ASC lives in different places depending on the actor:
									</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										ASCs on targets reside on the actor itself (
										<BSInlineFunction>ATarget</BSInlineFunction>
										).
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										ASCs on the character reside in the Player State (
										<BSInlineFunction>ABSPlayerState</BSInlineFunction>).
									</li>
								</ul>
							</div>
							<div className="article-subsection" ref={Ref_gasC_at} id="classes-UAbilityTask">
								<BlogHeadingClass
									baseClass="UGameplayTask"
									childClass="UAbilityTask"
									headingLevel={2}
								/>
								<p>
									It pains me to introduce this class before Gameplay Ability, but several of them use
									it so it should be introduced first.
								</p>{" "}
								<p>
									A Latent Action in Unreal is a blueprint node that has at least one additional
									output execution pin that is called after some period of time. In other words, it
									lets you do certain stuff only after certain stuff happens. In the editor, they have
									a timer symbol on the top right of the node, but{" "}
									<Link scroll={true} href={"#bpgraph-1"}>
										Blueprint Graph 1
									</Link>{" "}
									does not show it.
								</p>
								<p>
									An Ability Task can be used to perform a Latent Action from within a Gameplay
									Ability.
								</p>{" "}
								<p>
									Unreal includes a couple default ones like{" "}
									<BSInlineFunction>::UAbilityTask_PlayMontageAndWait</BSInlineFunction>, which is the
									first Ability Task shown in{" "}
									<Link scroll={true} href={"#bpgraph-1"}>
										Blueprint Graph 1
									</Link>{" "}
									and is used pretty much any time an animation needs to be played within a Gameplay
									Ability. It has four additional outputs corresponding to different events that can
									be executed depending on how the animation montage ended. The second shows{" "}
									<Link scroll={true} href={"#classes-UBSAT_AimToTarget"}>
										AimToTarget
									</Link>
									, which the{" "}
									<Link scroll={true} href={"#classes-UBSGA_AimBot"}>
										Aim Bot Ability
									</Link>{" "}
									uses and is discussed there.
								</p>
								<p>
									Ability Tasks can be used in C++ and in blueprint. The additional output execution
									pins that appear on the blueprint node are executed using delegates in C++. In C++,
									a task is created by using a static factory function that instantiates the task.
									After this, the task delegates can be bound to. In C++,{" "}
									<BSInlineFunction>::ReadyForActivation</BSInlineFunction> must be called, but does
									not have to be called in blueprints.
								</p>
								<BlueprintGraph
									id="bpgraph-1"
									bpLink="https://blueprintue.com/render/ojtm4x9n/"
									label="Blueprint Graph 1"
									description={
										"Two Ability Tasks inside the Fire Gun Ability's ActivateAbility event. The second is only shown for reference and is not executed."
									}
								/>
							</div>
							<div className="article-subsection" ref={Ref_gasC_ga} id="classes-UGameplayAbility">
								<BlogHeadingClass
									baseClass="UGameplayAbility"
									childClass="UBSGameplayAbility"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Abilities/BSGameplayAbility.cpp"
								/>
								<p>A Gameplay Ability (GA) is an action or skill that an actor can perform in game.</p>
								<p>
									There isn&#39;t much to the base override besides setting up how the ability is
									supposed to be activated (ActivationPolicy) and interact with other abilities
									(ActivationGroup).
								</p>
								<div className="article-subsection-2" id="classes-UBSGA_FireGun">
									<BlogHeadingClass
										baseClass="UBSGameplayAbility"
										childClass="UBSGA_FireGun"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Abilities/BSGA_FireGun.cpp"
									/>
									<p>
										This is the ability for shooting the gun in a game mode that uses Hit-Based
										Damage. This is the ability used in the{" "}
										<Link href={"#timeline"}>Timeline Section</Link>, so I won&#39;t go in depth
										here.
									</p>
								</div>
								<div className="article-subsection-2" id="classes-UBSGA_TrackGun">
									<BlogHeadingClass
										baseClass="UBSGameplayAbility"
										childClass="UBSGA_TrackGun"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Abilities/BSGA_TrackGun.cpp"
									/>
									<p>
										This is the ability for dealing damage to targets for a game mode that uses
										Tracking Damage. Most of this class is implemented in C++.{" "}
										<BSInlineFunction>::OnTargetDataReady</BSInlineFunction> is the only
										event/function used in the blueprint version of this ability.
									</p>
									<p>
										Since all of the elements in <Link href={"#bpgraph-2"}>Blueprint Graph 2</Link>{" "}
										are likely unfamiliar at this point, I&#39;ll provide a basic overview of what
										happens in this ability and leave the in-depth explanation to the{" "}
										<Link href={"#timeline-OnTargetDataReady"}>OnTargetDataReady Section</Link>:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The Ability is given to the character by the game mode and is immediately
											activated since the ActivationType is OnSpawn.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The <BSInlineFunction>UBSAT_TickTrace</BSInlineFunction> Ability Task is
											created. Its <BSInlineFunction>OnTickTraceHit</BSInlineFunction> delegate is
											bound to the <BSInlineFunction>::OnTickTraceHitResultHit</BSInlineFunction>{" "}
											function.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											When <BSInlineFunction>OnTickTraceHitResultHit</BSInlineFunction> is called,
											the HitResult is packaged into Target Data and eventually the{" "}
											<BSInlineFunction>::OnTargetDataReady</BSInlineFunction> event, shown in{" "}
											<Link href={"#bpgraph-2"}>Blueprint Graph 2</Link>, is called.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											After passing some checks, the hit actor from the HitResult is cast to a{" "}
											<BSInlineFunction>BP_Sphere_Target</BSInlineFunction>, which is the
											blueprint class for an <BSInlineFunction>ATarget</BSInlineFunction>.
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													If the cast succeeds, the player who owns this ability has their
													crosshair on the target. Tracking damage is applied to the target
													and the target color is changed to green.
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													If the cast fails, the player who owns this ability does not have
													their crosshair on the target. No damage is applied and the{" "}
													<BSInlineFunction>OnPlayerStopTrackingTarget</BSInlineFunction>{" "}
													delegate is broadcast to{" "}
													<BSInlineFunction>ATargetManager</BSInlineFunction> so that it can
													change all target colors to red.
												</li>
											</ul>
										</li>
									</ul>

									<BlueprintGraph
										bpLink="https://blueprintue.com/render/9vxf3yw1/"
										label="Bluprint Graph 2"
										description={"The blueprint portion of the Track Gun Ability"}
										id="bpgraph-2"
									/>
									<div className="article-subsection-2" id="classes-UBSAT_TickTrace">
										<BlogHeadingClass
											baseClass="UGameplayTask"
											childClass="UBSAT_TickTrace"
											headingLevel={4}
											compOfText="used by"
											compOf="UBSGA_TrackGun"
											childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Tasks/BSAT_TickTrace.cpp"
										/>
										<p>
											The purpose of this task is to broadcast a HitResult from a{" "}
											<BSInlineFunction>::LineTraceSingleByChannel</BSInlineFunction> every frame.
											I chose to use an Ability Task here because it can tick using{" "}
											<BSInlineFunction>::TickTask</BSInlineFunction>, while a GA cannot.
										</p>
										<p>
											Usually, Ability Tasks are ended pretty quickly, but this task is active as
											long as the Track Gun Ability is active since it doesn&#39;t make much sense
											to create and destroy a task every frame. I&#39;m not sure if this is an
											intended use for an Ability Task, but it does the job.
										</p>
									</div>
								</div>
								<div className="article-subsection-2" id="classes-UBSGA_AimBot">
									<BlogHeadingClass
										baseClass="UBSGameplayAbility"
										childClass="UBSGA_AimBot"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Abilities/BSGA_AimBot.cpp"
									/>
									<p>
										Before BeatShot&#39;s trailer was edited, I needed footage of the game in action
										but didn&#39;t want to worry about performing well during every footage take
										since there was a lot to record. This ability was created in response to this.
										It provides automated aiming to targets and looks decently realistic. It can
										handle all Hit-Based Damage game modes and is implemented in C++ only.
									</p>
									<p>
										This ability is given to the character using a console command. It&#39;s common
										for Cheat Manager classes to manage console commands, and that&#39;s exactly
										what{" "}
										<Link
											className="link text-light hover-white"
											href="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Player/BSCheatManager.cpp"
										>
											<BSInlineFunction>UBSCheatManager</BSInlineFunction>
										</Link>{" "}
										does.
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											When the Aim Bot console command is executed, the{" "}
											<BSInlineFunction>::CVarOnChanged_EnableAimBot</BSInlineFunction> function
											is called.
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													This function binds the OnTargetActivated_AimBot delegate located in{" "}
													<BSInlineFunction>ATargetManager</BSInlineFunction> to the{" "}
													<BSInlineFunction>::OnTargetSpawned_AimBot</BSInlineFunction>{" "}
													function located in{" "}
													<BSInlineFunction>ABSCharacter</BSInlineFunction>.
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													It also gives the ability to the Character using the{" "}
													<BSInlineFunction>::GiveAbility</BSInlineFunction> function on
													Character&#39;s ASC.
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The ability is immediately activated since the ActivationType is OnSpawn.
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Inside <BSInlineFunction>::ActivateAbility</BSInlineFunction>, the{" "}
													<BSInlineFunction>::OnTargetAddedToQueue</BSInlineFunction> function
													is bound to the owning Character&#39;s OnTargetAddedToQueue
													delegate.
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Each time a target is activated by the Target Manager, the Character adds a
											target to the head of a queue and broadcasts its OnTargetAddedToQueue
											delegate, which calls the{" "}
											<BSInlineFunction>::OnTargetAddedToQueue</BSInlineFunction> function in the
											ability:
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													This function calls{" "}
													<BSInlineFunction>::PeekActiveTargets</BSInlineFunction> on the
													Character. This returns a pointer to the queue&#39;s tail item
													without removing it from the queue.
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													If the queue is empty, a null pointer is returned, and nothing
													happens inside the ability. If the queue has invalid pointers, it is
													emptied.
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													If a valid pointer to a target is returned, the ability creates a
													new <BSInlineFunction>::UBSAT_AimToTarget</BSInlineFunction> task
													and binds to its OnCancelled and OnCompleted delegates.{" "}
													<BSInlineFunction>::ReadyForActivation</BSInlineFunction> is called
													to activate the task.
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											When either the OnCancelled or OnCompleted delegates are broadcast from the
											task, <BSInlineFunction>::PopActiveTargets</BSInlineFunction> is called on
											the Character which removes the target from the tail of the queue.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The queue could have been stored anywhere but it ended up on the character
											since it&#39;s easy to access from the ability.
										</li>
									</ul>
									<div className="article-subsection-2" id="classes-UBSAT_AimToTarget">
										<BlogHeadingClass
											baseClass="UAbilityTask"
											childClass="UBSAT_AimToTarget"
											headingLevel={4}
											childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Tasks/BSAT_AimToTarget.cpp"
										/>
										<p>
											The main reason I chose to use an Ability Task for the Aim Bot ability is
											because it can tick using <BSInlineFunction>::TickTask</BSInlineFunction>,
											while a GA cannot. Tick is needed here because the control rotation of the
											character needs to be lerped smoothly across frames.
										</p>
										<p>This task takes a few parameters from the ability that creates it:</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />A{" "}
												<BSInlineFunction>UCurveFloat</BSInlineFunction> is used to read the
												value from a curve on tick. This is done using a FOnTimelineFloat
												delegate and the curve. The{" "}
												<BSInlineFunction>::OnTimelineTick</BSInlineFunction> function is bound
												to the FOnTimelineFloat delegate, so every time the timeline ticks, the
												value from the curve is passed as a parameter to this function.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The target (<BSInlineFunction>ATarget</BSInlineFunction>) to aim toward
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The timeline playback rate
											</li>
										</ul>
										<p>
											An FOnTimelineEvent is used to bind the timeline completion to the{" "}
											<BSInlineFunction>::OnTimelineCompleted</BSInlineFunction> function. When
											the task is activated, the timeline is played from the start.{" "}
											<BSInlineFunction>::TickTimeline</BSInlineFunction> is called from{" "}
											<BSInlineFunction>::TickTask</BSInlineFunction> as long as the task state is
											active.
										</p>
										<p>
											Inside <BSInlineFunction>::OnTimelineTick</BSInlineFunction>,{" "}
											<BSInlineFunction>::SetControlRotation</BSInlineFunction> is called to
											update the controller rotation every frame.
										</p>
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<BSInlineFunction>::GetActorEyesViewPoint</BSInlineFunction> is called
												to get the current location and rotation of the player controller.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The new controller rotation is found using{" "}
												<BSInlineFunction>UKismetMathLibrary::RLerp</BSInlineFunction> with the
												following parameters:
												<ul>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														Start rotation: rotation obtained from{" "}
														<BSInlineFunction>::GetActorEyesViewPoint</BSInlineFunction>
													</li>
													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														End rotation: found using{" "}
														<BSInlineFunction>
															UKismetMathLibrary::FindLookAtRotation
														</BSInlineFunction>{" "}
														with the following parameters:
														<ul>
															<li>
																<FontAwesomeIcon
																	icon={faCrosshairs}
																	className="li-icon"
																/>
																Start location: location obtained from{" "}
																<BSInlineFunction>
																	::GetActorEyesViewPoint
																</BSInlineFunction>
															</li>
															<li>
																<FontAwesomeIcon
																	icon={faCrosshairs}
																	className="li-icon"
																/>
																End location: current location of the target
															</li>
														</ul>
													</li>

													<li>
														<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
														Alpha: the function parameter which is value from the curve
													</li>
												</ul>
											</li>
										</ul>
										<p>
											When the timeline finishes playing, the OnCompleted delegate is broadcast,
											and the task is ended.
										</p>
									</div>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_gasC_asb} id="classes-UBSAttributeSetBase">
								<BlogHeadingClass
									baseClass="UAttributeSet"
									childClass="UBSAttributeSetBase"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Globals/BSAttributeSetBase.cpp"
								/>
								<p className="">
									An Attribute Set is a group of stats that an actor with an ASC has. BeatShot has
									several attributes, including Max Health, Health, Hit Damage, Tracking Damage, and{" "}
									Total Damage.
								</p>
								<p className="">
									The first four are regular attributes that are replicated, while Total Damage is
									considered Meta attribute. Meta attributes only exist on the server and are used in
									BeatShot to calculate the damage that should be applied to a target.
								</p>
								<ul>
									In my implementation, attribute sets live in different places depending on the
									actor:
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Attribute sets on targets reside on the actor itself (
										<BSInlineFunction>ATarget</BSInlineFunction>
										).
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Attribute sets on characters reside in the Player State (
										<BSInlineFunction>ABSPlayerState</BSInlineFunction>
										).
									</li>
								</ul>
								<p className="">
									FBSAttributeEvent is a delegate that I created that broadcasts any time an attribute
									is changed. Health and MaxHealth both have one of these delegates (OnHealthChanged
									and OnMaxHealthChanged ), but the damage attributes do not.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_gasC_ge} id="gameplay-effects">
								<BlogHeading headingText="Gameplay Effects" headingLevel={1} />
								<p>
									Gameplay Effects (GEs) are a critical part of GAS, but they are not subclassed. I’ll
									share the description from the{" "}
									<Link
										className="link text-light hover-white"
										href={"https://github.com/tranek/GASDocumentation"}
									>
										GAS Documentation
									</Link>
									:
								</p>
								<blockquote className="otro-blockquote">
									GameplayEffects (GE) are the vessels through which abilities change attributes and
									Gameplay Tags on themselves and others. They can cause immediate attribute changes
									like damage or healing or apply long term status buff/debuffs like a movement speed
									boost or stunning. The UGameplayEffect class is a meant to be a data-only class that
									defines a single gameplay effect. No additional logic should be added to
									GameplayEffects. Typically designers will create many Blueprint child classes of
									UGameplayEffect.
								</blockquote>
								<p>
									Any damage that is dealt in BeatShot is applied using an instant duration GE. This
									is discussed further in the{" "}
									<Link href={"#classes-UBSDamageExecCalc"}>UBSDamageExecCalc section</Link>.
								</p>
								<p>
									Duration and Infinite GEs have the option of applying periodic effects, which are
									treated like Instant GEs that occur at fixed intervals. These are set up using
									timers.
								</p>
								<div className="article-subsection-2" id="ge-infinite" ref={Ref_gasC_ge_tarImm}>
									<BlogHeading headingText="Target Immunity" headingLevel={3} />
									<p>
										GEs have a property called Granted Application Immunity Tags which grants the
										owner immunity to all matching GAS that have the same Ability Tag.
									</p>
									<p>
										Game modes that use Hit-Based damage spawn targets with immunity to the Tracking
										Ability (and consequently Tracking Damage). These targets will have the
										corresponding Ability Tag of Ability.Track in their Granted Application Immunity
										Tags.
									</p>
									<p>
										Targets can also be immune to all damage, such as before a game mode starts or
										if a Target Activation/Deactivation Response involves removing or applying
										immunity. These various types of immunity are applied using infinite duration{" "}
										GEs and are typically called directly on the target itself using{" "}
										<BSInlineFunction>::ApplyGameplayEffectToSelf</BSInlineFunction>.
									</p>
								</div>
								<div className="article-subsection-2" id="fire-cooldown" ref={Ref_gasC_ge_fireCD}>
									<BlogHeading headingText="Fire Cooldown" headingLevel={3} />
									<p>
										To apply a cooldown to the Fire Gun Ability, or basically fire rate, a
										duration-based GE is supplied to the GA blueprint property Cooldown Gameplay
										Effect Class. This GE has the following blueprint properties:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Duration Policy: Has Duration
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Scalable Float Magnitude: fire rate of the weapon
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Granted Tags: Data.Cooldown is added
										</li>
									</ul>
									<p>
										I use a generic universal cooldown Gameplay Tag called Data.Cooldown but that
										might change in the future.
									</p>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_gasC_eic} id="classes-UBSInputComponent">
								<BlogHeadingClass
									baseClass="UEnhancedInputComponent"
									childClass="UBSInputComponent"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Input/BSInputComponent.cpp"
								/>
								<p>
									I chose to implement this class simply because I found the{" "}
									<BSInlineFunction>::BindAbilityActions</BSInlineFunction> function in the Lyra
									Sample Project. This function allows abilities to be bound to an Input Action using
									an Input Tag. These mappings are done through the data asset{" "}
									<BSInlineFunction>UBSInputConfig</BSInlineFunction>.
								</p>
								<div className="article-subsection" ref={Ref_gasC_eic_ic} id="classes-UBSInputConfig">
									<BlogHeadingClass
										baseClass="UDataAsset"
										childClass="UBSInputConfig"
										headingLevel={3}
										childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Input/BSInputConfig.cpp"
									/>
									<p>
										This data asset maps each Input Action to an Input Tag, which is just a Gameplay
										Tag. Input Tags are used so that Input Actions can be bound to abilities that
										might not yet be granted. All Input Actions are bound to functions inside the{" "}
										<BSInlineFunction>ABSCharacter</BSInlineFunction> class and are bound during{" "}
										<BSInlineFunction>::InitializePlayerInput</BSInlineFunction>. This data asset
										splits Input Actions into two categories:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Native Input Actions are things like look, move, and walk. They are not tied
											to an ability. Each of these are bound to unique functions.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Ability Input Actions are bound to specific abilities. All of these are
											bound to the same functions:{" "}
											<BSInlineFunction>::Input_AbilityInputTagPressed</BSInlineFunction> and{" "}
											<BSInlineFunction>::Input_AbilityInputTagReleased</BSInlineFunction>.
										</li>
									</ul>
									<p>
										Each GA blueprint that requires input from the user contains the Input Tag in
										the bluprint property Ability Tags. For example, the Fire Gun blueprint Ability
										Tags are Ability.Fire and Input.Fire. As shown in{" "}
										<Link href={"#figure-1"}>Figure 1</Link>, the Input Tag for the Input Action
										associated with firing the weapon is also Input.Fire.
									</p>
									<Figure
										id="figure-1"
										image={DA_InputConfig}
										figNumber={1}
										figCaption={`The input configuration for a character in BeatShot.`}
										alt="DA_InputConfig"
										limitMaxWidth
									/>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_gasC_as} id="classes-UBSAbilitySet">
								<BlogHeadingClass
									baseClass="UDataAsset"
									childClass="UBSAbilitySet"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/Globals/BSAbilitySet.cpp"
								/>
								<p>
									An Ability Set is a group of Gameplay Abilities, Gameplay Effects, and Attribute
									Sets. This isn&#39;t strictly necessary to implement, but it makes it easier to
									grant and remove a large number of GAS and GEs that use various Attribute Sets.
								</p>
								<p>
									<BSInlineFunction>::GiveToAbilitySystem</BSInlineFunction> handles granting all
									components of this class to the specified ASC and{" "}
									<BSInlineFunction>::TakeFromAbilitySystem</BSInlineFunction> handles their removal.
								</p>
								<p>
									A GA is granted by creating an{" "}
									<BSInlineFunction>FGameplayAbilitySpec</BSInlineFunction> and calling{" "}
									<BSInlineFunction>::GiveAbility</BSInlineFunction> on the ASC. This returns an{" "}
									FGameplayAbilitySpecHandle, which is stored so that it can later be used to remove
									the GA using <BSInlineFunction>::ClearAbility</BSInlineFunction>.
								</p>
								<p>
									Similarly, a GE is applied by creating an{" "}
									<BSInlineFunction>FGameplayEffectSpec</BSInlineFunction> and calling{" "}
									<BSInlineFunction>::ApplyGameplayEffectToSelf</BSInlineFunction> on the ASC. This
									returns an FGameplayEffectSpecHandle, which is stored so that it can later be used
									to remove the GE using{" "}
									<BSInlineFunction>::RemoveActiveGameplayEffect</BSInlineFunction>.
								</p>
								<p>
									An Attribute Set is granted by creating a new Attribute Set object and calling{" "}
									<BSInlineFunction>::AddAttributeSetSubobject</BSInlineFunction>. This returns the
									added Attribute Set, which is stored so that it can be later used to remove the
									Attribute Set using <BSInlineFunction>::RemoveSpawnedAttribute</BSInlineFunction>.
								</p>
								<p>
									<Link href={"#figure-2"}>Figure 2</Link> shows the Ability Set that is granted to
									the character when the knife is equipped. The Input Tag is not strictly necessary
									since all the abilities already have it in their Ability Tags.
								</p>
								<Figure
									id="figure-2"
									image={DA_KnifeAbilitySet}
									figNumber={2}
									figCaption={`The Ability Set for the when the character has a knife equipped.`}
									alt="DA_KnifeAbilitySet"
									limitMaxWidth
								/>
							</div>
							<div className="article-subsection" ref={Ref_gasC_dec} id="classes-UBSDamageExecCalc">
								<BlogHeadingClass
									baseClass="UGameplayEffectExecutionCalculation"
									childClass="UBSDamageExecCalc"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/AbilitySystem/ExecutionCalculations/BSDamageExecCalc.cpp"
								/>
								<p>
									Instead of just &#34;Apply 100 damage by removing 100 health points&#34;, a Gameplay
									Effect Execution Calculation ( Execution) lets you execute additional calculations,
									such as snapshotting various attributes from both the source and the target.
									Examples could include taking armor, shield, or resistances into account to get the
									final damage value to be applied. It also gives access to both the source and target
									Gameplay Tags.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_gasC_hc} id="classes-UBSHealthComponent">
								<BlogHeadingClass
									baseClass="UActorComponent"
									childClass="UBSHealthComponent"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Character/BSHealthComponent.cpp"
								/>
								<p>
									This component is added to any actors where keeping track of their health is
									important. In this case, it is only added to targets.
								</p>
								<p>
									To be honest, the Health Component is kind of unnecessary since the target could
									just bind to the <BSInlineFunction>UBSAttributeSetBase</BSInlineFunction>
									&#39;s OnHealthChanged delegate directly, but if I wanted to add additional actors
									that use Health Components in the future, it would be less coding in the long run.
								</p>
							</div>
						</div>
						<div className="article-section" ref={Ref_tl} id="timeline">
							<BlogHeading headingText="Timeline" headingLevel={1} />
							<p>
								For this section, I detail what happens when the player in BeatShot shoots a target in a
								Hit-Based damage game mode, starting from when the player presses the IA. This means
								that the GA used throughout this section will always be{" "}
								<BSInlineFunction>UBSGA_FireGun</BSInlineFunction>.
							</p>
							<div className="article-subsection" ref={Ref_tl_input} id="timeline-Input">
								<BlogHeading headingText="Input" headingLevel={2} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Player presses the key or mouse that is bound to an Input Action.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										<BSInlineFunction>::Input_AbilityInputTagPressed</BSInlineFunction> is called on
										the character, which simply calls{" "}
										<BSInlineFunction>::AbilityInputTagPressed</BSInlineFunction> on the
										character&#39;s ASC. If the ASC finds an activatable GA with the matching{" "}
										Ability Tag, the Gameplay Ability Handle is added to the member variable
										InputPressedSpecHandles. These get processed in{" "}
										<BSInlineFunction>::ProcessAbilityInput</BSInlineFunction>. This function is
										called from the player controller inside{" "}
										<BSInlineFunction>::PostProcessInput</BSInlineFunction>.
									</li>
								</ul>
							</div>
							<div className="article-subsection" ref={Ref_tl_aa} id="timeline-AbilityActivation">
								<BlogHeading headingText="Ability Activation" headingLevel={2} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										If an activatable ability was found in the ASC,{" "}
										<BSInlineFunction>::TryActivateAbility</BSInlineFunction> is called, which
										begins a series of internal function calls that eventually end up calling{" "}
										<BSInlineFunction>::ActivateAbility</BSInlineFunction> on the Fire Gun Ability.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										The C++ version of <BSInlineFunction>::ActivateAbility</BSInlineFunction>{" "}
										doesn’t do anything noteworthy but the{" "}
										<Link href={"#bpgraph-1"}>blueprint version</Link> calls{" "}
										<BSInlineFunction>::StartTargeting</BSInlineFunction>, which is implemented in
										C++ and is discussed in the next section. It also calls the{" "}
										<BSInlineFunction>::PlayMontageAndWait</BSInlineFunction> Ability Task to play
										the Animation Montage for the weapon recoil.
									</li>
								</ul>
								<div className="article-subsection-2" ref={Ref_tl_aa_st} id="timeline-StartTargeting">
									<BlogHeadingClass
										childClassColor="#50fa7b"
										childClass="StartTargeting"
										headingLevel={3}
									/>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											This function&#39;s main purpose is to create the structure that holds the
											targeting data. This comes in the form of an{" "}
											<BSInlineFunction>FGameplayAbilityTargetDataHandle</BSInlineFunction>, which
											holds an array of pointers to{" "}
											<BSInlineFunction>FGameplayAbilityTargetData</BSInlineFunction>.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>FGameplayAbilityTargetData</BSInlineFunction> allows
											passing data across the network. GAS comes with several subclassed versions,
											but the one used here is{" "}
											<BSInlineFunction>
												FGameplayAbilityTargetData_SingleTargetHit
											</BSInlineFunction>{" "}
											since it allows passing a HitResult.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The HitResult is obtained by calling{" "}
											<BSInlineFunction>::SingleWeaponTrace</BSInlineFunction>, which traces a
											single line using a collision channel I created that ignores any pawn or
											weapon meshes. The start of the trace begins at the player’s Camera
											Component, some maths are done to find end location, and{" "}
											<BSInlineFunction>UWorld::LineTraceSingleByChannel</BSInlineFunction> is
											called to get the HitResult.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The last thing <BSInlineFunction>::StartTargeting</BSInlineFunction> does is
											call <BSInlineFunction>::OnTargetDataReadyCallback</BSInlineFunction>.
										</li>
									</ul>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_tl_aa_otdrc}
									id="timeline-OnTargetDataReadyCallback"
								>
									<BlogHeadingClass
										childClassColor="#50fa7b"
										childClass="OnTargetDataReadyCallback"
										headingLevel={3}
									/>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											This function does some more networking stuff like creating a
											ScopedPredictionWindow and RPC the target data to the server, but I&#39;m no
											expert on these topics since I just copied them from the Lyra Example
											Project.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>::CommitAbility</BSInlineFunction> is called on the GA.
											This is where any cooldowns or costs associated with the ability are
											checked. The cooldown for FireGun is the same as the weapon’s fire rate, but
											there is no cost to firing the weapon since BeatShot’s weapons have
											unlimited ammo. If <BSInlineFunction>::CommitAbility</BSInlineFunction>{" "}
											returns false, the ability is ended, otherwise{" "}
											<BSInlineFunction>::OnTargetDataReady</BSInlineFunction> is called.
										</li>
									</ul>
								</div>
								<div
									className="article-subsection-2"
									ref={Ref_tl_aa_otdr}
									id="timeline-OnTargetDataReady"
								>
									<BlogHeadingClass
										childClassColor="#50fa7b"
										childClass="OnTargetDataReady"
										headingLevel={3}
									/>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											This event/function is implemented in blueprint and shown in{" "}
											<Link href={"#bpgraph-3"}>Blueprint Graph 3</Link>.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The <BSInlineFunction>FGameplayAbilityTargetDataHandle</BSInlineFunction> is
											the only parameter passed to this function, which is what{" "}
											<BSInlineFunction>::StartTargeting</BSInlineFunction> created earlier.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											If the HitResult contained a blocking hit, an{" "}
											<BSInlineFunction>FGameplayEffectSpec</BSInlineFunction> ( GESpec) is
											creating using{" "}
											<BSInlineFunction>::MakeOutgoingGameplayEffectSpec</BSInlineFunction> with
											the input GE containing the blueprint properties:
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Duration Policy: Instant
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Executions: The C++ class{" "}
													<BSInlineFunction>BSDamageExecCalc</BSInlineFunction> is added
												</li>
											</ul>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>::ApplyGameplayEffectSpecToTarget</BSInlineFunction> is
											called using the GESpec and target data.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The{" "}
											<BSInlineFunction>
												::ExecuteGameplayCueWithParamsOnOwner
											</BSInlineFunction>{" "}
											function is called using the HitResult as a parameter and the Gameplay Cue
											Tag of GameplayCue.FireGun. The{" "}
											<Link href={"#timeline-GameplayCues"}>Gameplay Cues section</Link> goes over
											what happens when this is called.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>::EndAbility</BSInlineFunction> is called after execution
											of the GE and Gameplay Cue.
										</li>
									</ul>
									<BlueprintGraph
										bpLink="https://blueprintue.com/render/hoqr4itn/"
										label="Blueprint Graph 3"
										description={
											<BSInlineFunction>::UBSGA_FireGun::OnTargetDataReady</BSInlineFunction>
										}
										id="bpgraph-3"
									/>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_tl_geApp} id="timeline-ApplyingTheGE">
								<BlogHeading headingText="Applying The Gameplay Effect" headingLevel={2} />
								<p>
									A GESpec is essentially just a modifiable instance of a GE since a GE is a data-only
									class. Inside its <BSInlineFunction>::Initialize</BSInlineFunction> function, it
									sets the context and performs other prep-related tasks. One of these tasks is
									calling <BSInlineFunction>::CaptureDataFromSource</BSInlineFunction>. This informs
									the GESpec which attributes to capture from the source. This can be called multiple
									times depending on source target setup. Target attributes are captured later in
									execution.
								</p>
								<p>
									There&#39;s actually three{" "}
									<BSInlineFunction>::ApplyGameplayEffectSpecToTarget</BSInlineFunction> functions
									that are called since we&#39;re starting from a GA. It starts with the one owned by
									the GA and then calls the{" "}
									<BSInlineFunction>FGameplayAbilityTargetData</BSInlineFunction> version, which
									duplicates the GESpec and context. Then it calls the ASC version for each targeted
									actor, but there will only be one in this example.
								</p>
								<div
									className="article-subsection-2"
									ref={Ref_tl_geApp_agets}
									id="timeline-ApplyGESpectoSelf"
								>
									<BlogHeadingClass
										childClassColor="#50fa7b"
										childClass="ApplyGameplayEffectSpecToSelf"
										headingLevel={3}
									/>
									<p>
										<BSInlineFunction>::ApplyGameplayEffectSpecToTarget</BSInlineFunction> is just a
										convenience function that calls{" "}
										<BSInlineFunction>::ApplyGameplayEffectSpecToSelf</BSInlineFunction> using the
										target ASC parameter. In this example, it’s the{" "}
										<BSInlineFunction>ATarget</BSInlineFunction>
										’s ASC.
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											For all GE Duration Types, Application immunity is checked and the chance to
											apply the effect is calculated (always 100% in this example). Application
											Tag Requirements, Removal Tag Requirements, and Custom Application
											Requirements are also checked (none here).
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The major difference between Instant and all other Duration Types is that
											Instant GEs are not <u>applied</u> but instead <u>executed</u> through{" "}
											<BSInlineFunction>::ExecuteGameplayEffect</BSInlineFunction>. All other
											types instead call{" "}
											<BSInlineFunction>::ApplyGameplayEffectSpec</BSInlineFunction> on the{" "}
											<BSInlineFunction>FActiveGameplayEffectsContainer</BSInlineFunction>.{" "}
											<BSInlineFunction>::ExecuteGameplayEffect</BSInlineFunction> is detailed in
											the next section.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Any effects that should be removed on application of this GE are removed.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The source{" "}
											<BSInlineFunction>::OnGameplayEffectAppliedToSelf</BSInlineFunction> and the
											target <BSInlineFunction>OnGameplayEffectAppliedToTarget</BSInlineFunction>{" "}
											delegates are broadcast.
										</li>
										<div
											className="article-subsection-2"
											ref={Ref_tl_geApp_ege}
											id="timeline-ExecuteGameplayEffect"
										>
											<BlogHeadingClass
												childClassColor="#50fa7b"
												childClass="ExecuteGameplayEffect"
												headingLevel={4}
											/>
											<p>
												<BSInlineFunction>::ExecuteGameplayEffect</BSInlineFunction> calls{" "}
												<BSInlineFunction>::ExecuteActiveEffectsFrom</BSInlineFunction> on the{" "}
												<BSInlineFunction>FActiveGameplayEffectsContainer</BSInlineFunction>{" "}
												within the ASC, which is really where the GE gets executed on attributes
												and Active GEs.
											</p>
											<ul>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Target attributes are captured using{" "}
													<BSInlineFunction>
														::CaptureAttributeDataFromTarget
													</BSInlineFunction>
													.
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													Any Modifiers and Executions on the GE are executed.
													<ul>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															As previously mentioned, BeatShot uses two types of damage:
															Hit and Tracking. These attributes are snapshot from the
															source (damage causer) during initialization of the of a{" "}
															GESpec.
														</li>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															The GE created earlier uses the Execution{" "}
															<BSInlineFunction>UBSDamageExecCalc</BSInlineFunction>.{" "}
															<BSInlineFunction>
																::Execute_Implementation
															</BSInlineFunction>{" "}
															is where the calculation takes place.
															<ul>
																<li>
																	<FontAwesomeIcon
																		icon={faCrosshairs}
																		className="li-icon"
																	/>
																	The source and target Gameplay Tags are accessed to
																	tell which kinds of immunity, if any, the target
																	has. If the target is immune to Hit Damage, the Hit
																	Damage attribute that was captured from the source
																	is not used in the damage calculation. Similarly, if
																	the target is immune to Tracking Damage, the{" "}
																	Tracking Damage attribute is not used.
																</li>
																<li>
																	<FontAwesomeIcon
																		icon={faCrosshairs}
																		className="li-icon"
																	/>
																	The calculation adds an Output Execution Modifier{" "}
																	that sets the value of the Total Damage Meta{" "}
																	attribute. This directly modifies the attribute on
																	the target ASC.
																</li>
															</ul>
														</li>
														<li>
															<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
															After the GE is executed,{" "}
															<BSInlineFunction>
																::PostGameplayEffectExecute
															</BSInlineFunction>{" "}
															is called on the target Attribute Set. The input parameter{" "}
															<BSInlineFunction>
																::FGameplayEffectModCallbackData
															</BSInlineFunction>{" "}
															describes which, if any, attributes were changed by the GE.
															In this example, the Total Damage attribute will appear
															modified. Then, the Health attribute is set to its current
															value subtracted by the value of the Total Damage attribute.
															The OnHealthChanged delegate is then broadcast.
														</li>
													</ul>
												</li>
												<li>
													<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
													If an Execution wants conditional effects to trigger, those are
													applied (None for this example).
												</li>
												<p>
													Instead of using a GE Execution, I could have used a GE Modifier.
													You can also use both.
												</p>
												<p>
													Instead of using the Total Damage Meta attribute, I could have
													directly set the value of the Health Attribute inside the Execution
													Calculation. However, the attribute could get changed twice if the
													Execution Calculation did not clamp the value while{" "}
													<BSInlineFunction>::PreAttributeChange</BSInlineFunction> did.{" "}
												</p>
												<p>
													<BSInlineFunction>::PreAttributeChange</BSInlineFunction> still gets
													called before{" "}
													<BSInlineFunction>::PostGameplayEffectExecute</BSInlineFunction>, so
													it would not have an impact on any OnHealthChanged delegate
													receivers. However, the ASC provides a delegate called the{" "}
													GameplayAttributeValueChangeDelegate , which would get called twice.
												</p>
											</ul>
										</div>
									</ul>
								</div>
							</div>
							<div className="article-subsection" ref={Ref_tl_gc} id="timeline-GameplayCues">
								<BlogHeading headingText="Gameplay Cues" headingLevel={2} />
								<p>
									Gameplay Cues allow non-gameplay related tasks to execute like effects, decals, etc.
									You can trigger them through GEs or directly like I did in{" "}
									<Link scroll={true} href={"#bpgraph-3"}>
										Blueprint Graph 3
									</Link>
									. I chose not to use a GE because I always want GameplayCue.FireGun to trigger any
									time the ability is activated regardless of the GE application success.
								</p>
								<p>
									I chose to use an <BSInlineFunction>UGameplayCueNotify_Burst</BSInlineFunction>{" "}
									since its meant to be used for one-off events.{" "}
									<BSInlineFunction>AGameplayCueNotify_Actor</BSInlineFunction> is another version
									that is actually spawned in the world, but that is not used in this example.
								</p>
								<div className="article-subsection-2" ref={Ref_tl_gc_wf} id="timeline-GCNWeaponFire">
									<BlogHeading headingText="GCN_WeaponFire and BP_WeaponFire" headingLevel={3} />
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>GCN_WeaponFire</BSInlineFunction> is the{" "}
											<BSInlineFunction>UGameplayCueNotify_Burst</BSInlineFunction> blueprint
											class that handles the GameplayCue.FireGun response. First, the C++ function{" "}
											<BSInlineFunction>::Fire</BSInlineFunction> is called on the character’s
											weapon to increment the total shots fired by the player.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Next, recoil is applied to the character if the gun has a Gameplay Tag that
											denotes if recoil should be used.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Finally, the blueprint function{" "}
											<BSInlineFunction>::Fire_BP</BSInlineFunction> is called on the weapon, and
											the Impact Position and Impact Normal from the HitResult are passed as
											parameters. This function is responsible for spawning the{" "}
											<BSInlineFunction>WeaponFire</BSInlineFunction> blueprint class, as well as
											updating a few variables inside that instruct whether or not and where to
											spawn the various effects.
										</li>
									</ul>
									<BlueprintGraph
										bpLink="https://blueprintue.com/render/pqprz-_7/"
										label="Blueprint Graph 4"
										description={
											<BSInlineFunction>GameplayCueNotify_Burst::OnBurst</BSInlineFunction>
										}
									/>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>::WeaponFire</BSInlineFunction> manages the bullet
											tracers, muzzle flash, and decals. A separate actor is used so that if the
											character swaps to the knife, the effects are still managed without relying
											on the weapon. There isn’t much too much going on here besides calling{" "}
											<BSInlineFunction>::SpawnSystemAttached</BSInlineFunction> and{" "}
											<BSInlineFunction>::SpawnDecal</BSInlineFunction>.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="article-section" ref={Ref_conclusion} id="conclusion">
							<BlogHeading headingText="Conclusion" headingLevel={1} />
							<p>
								BeatShot&#39;s abilities are pretty simple, so it does not take full advantage of
								everything GAS has to offer. However, I do not believe it was a waste of time to
								implement. Adding new abilities is a breeze once everything is set up. If BeatShot were
								to ever offer multiplayer in the future, the abilities would still work thanks to
								built-in replication from GAS.
							</p>
							<p>A few thoughts after diving into GAS: </p>
							<ul>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									There are many ways to accomplish goals within the framework, and I don&#39;t think
									there&#39;s a wrong or right way as long as it works.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									It&#39;s okay to not know what&#39;s going on. Focus on the task at hand and look
									for any examples that relate to the goal.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									Unreal Engine is open source. Take advantage of that and look at what is happening
									behind the scenes when you have questions.
								</li>
								<li>
									<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
									Set breakpoints in your IDE and run the program using the debug configuration to see
									which functions are called when and what the stack looks like.
								</li>
							</ul>
							<p>
								Writing public-facing articles helps reinforce what I learn. While writing this one, I
								modified quite a few things (see{" "}
								<Link
									href="https://github.com/markoleptic/BeatShot/commit/33a788d180c8666ca45f27d3b6b102ec2e324901"
									className=""
								>
									here
								</Link>{" "}
								through{" "}
								<Link
									href="https://github.com/markoleptic/BeatShot/commit/9c7feb6769ed34e0a6379d20f04a599a4adcc5c3"
									className=""
								>
									here
								</Link>
								). It forces me to understand my implementation at a deeper level since I don&#39;t want
								to provide misinformation or include anything seemingly unnecessary. If you believe
								something I&#39;ve said is incorrect, feel free to{" "}
								<Link href="mailto: mark@beatshot.gg">send me an email</Link> so I can correct it. I
								hope you learned something and thanks for reading!
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

export { GameplayAbilitySystem, blogPostData };
