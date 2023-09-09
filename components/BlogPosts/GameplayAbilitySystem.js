"use client";
import { useRef } from "react";
import image_Hero from "../../public/SpawnMemory_Hero_Cropped.png";
import useOnScreen from "../../hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "../SidebarHashLink";
import { BSCodeBlock, BSInlineCodeBlock, BSInlineEnum, BSInlineFunction } from "../CodeBlock";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogHeadingClass, BlogHeading } from "./BlogComponents/BlogHeading";

const GameplayAbilitySystem = () => {
  const articlePath = "/devblog/gameplay-ability-system-overview";

  const Ref_0 = useRef(null);
  const Ref_1 = useRef(null);
  const Ref_2 = useRef(null);
  const Ref_3 = useRef(null);
  const Ref_4 = useRef(null);
  const Ref_5 = useRef(null);
  const Ref_6 = useRef(null);
  const Ref_7 = useRef(null);
  const Ref_8 = useRef(null);
  const Ref_9 = useRef(null);
  const Ref_10 = useRef(null);
  const Ref_11 = useRef(null);
  const Ref_12 = useRef(null);
  const Ref_13 = useRef(null);
  const Ref_14 = useRef(null);
  const Ref_15 = useRef(null);
  const Ref_16 = useRef(null);
  const Ref_17 = useRef(null);
  const Ref_18 = useRef(null);
  const Ref_19 = useRef(null);
  const Ref_20 = useRef(null);
  const Ref_21 = useRef(null);
  const Ref_22 = useRef(null);
  const Ref_23 = useRef(null);
  const Ref_24 = useRef(null);

  return (
    <>
      <div className="flex-container-column">
        <div className="hero-container">
          <div className="hero">
            <h1>An Overview of Unreal&#39;s Gameplay Ability System in BeatShot</h1>
            <p className="hero-lead">
              Why is the Gameplay Ability System used in BeatShot? This article explains the role of GAS and provides a walkthrough of a
              common ability.
            </p>
            <Image className="hero-image" priority src={image_Hero} quality={100} alt="logo" />
          </div>
        </div>
        <div className="flex-container-row">
          <div className="sidebar-container left">
            <div className="sidebar-main"></div>
          </div>
          <article className="flex-container-column" id="article">
            <time dateTime="2023-07-02"></time>
            <p>From the Unreal Engine Docs:</p>
            <blockquote className="otro-blockquote">
              The Gameplay Ability System is a framework for building attributes, abilities, and interactions that an Actor can own and
              trigger. The system is designed to be adapted to a wide variety of Gameplay-Driven projects such as Role-Playing Games(RPGs),
              Action-Adventure games, and Multiplayer Online Battle Arenas games(MOBA). Using this system, you can create abilities like a
              single attack, or add more complexity like a spell that triggers many status effects depending on data from the user and the
              targets.
            </blockquote>
            <p>
              It might not sound like the Gameplay Ability System (GAS) has a reason to be in BeatShot. However, the two damage types in
              BeatShot (hit and tracking) are separate abilities created in the framework. Shooting a weapon could have easily been
              accomplished with GAS, and it was that way at first. I simply wanted to learn how abilities worked in Unreal, and this article
              describes how I&#39;ve implemented it along with showing what actually happens during the game when you shoot the weapon. I
              learned much of what I know about GAS from this incredible{" "}
              <Link className="link text-light hover-white" href={"https://github.com/tranek/GASDocumentation"}>
                GASDocumentation
              </Link>{" "}
              from the community (its massive). I&#39;m not looking to do the same thing here, but instead show an example implementation
              and execution.
            </p>
            <div className="article-section" ref={Ref_0} id="gas-subclasses">
              <BlogHeading headingText="GAS Subclasses" headingLevel={1} />
              <p>
                Many of the classes that are part of GAS are meant to be subclassed in C++. In this section, I&#39;ll introduce the most
                necessary classes that BeatShot overrides.
              </p>
              <div className="article-subsection" ref={Ref_1} id="classes-UAbilitySystemComponent">
                <BlogHeadingClass
                  baseClass="UAbilitySystemComponent"
                  childClass="UBSAbilitySystemComponent"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/BSAbilitySystemComponent.cpp"
                />
                <p>
                  The Ability System Component (ASC) is added to any actor that wants to interact with GAS. For BeatShot, the only actors
                  that have ASCs are the Character (ABSCharacter) and the targets (ATarget).
                </p>
                <ul>
                  In my implementation, the Ability System Component (ASC) live in different places depending on the actor:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    ASCs on targets reside on the actor itself (ATarget).
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    ASCs on the Character reside in the Player State (ABSPlayerState).
                  </li>
                </ul>
              </div>
              <div className="article-subsection" ref={Ref_2} id="classes-UGameplayAbility">
                <BlogHeadingClass
                  baseClass="UGameplayAbility"
                  childClass="UBSGameplayAbility"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/Abilities/BSGameplayAbility.cpp"
                />
                <p>A Gameplay Ability (GA) is an action or skill that an actor can perform in game.</p>
                <p>
                  There isn&#39;t much to the base override besides setting up how the ability is supposed to be activated
                  (ActivationPolicy) and interact with other abilities (ActivationGroup).
                </p>
                <div className="article-subsection-2" ref={Ref_3} id="classes-UBSGameplayAbility_FireGun">
                  <BlogHeadingClass
                    baseClass="UBSGameplayAbility"
                    childClass="UBSGameplayAbility_FireGun"
                    headingLevel={3}
                    childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/Abilities/BSGameplayAbility_FireGun.cpp"
                  />
                  <p>
                    This the ability for shooting the gun for a game mode that uses Hit-Based Damage. I implemented some of this class in
                    C++ and some in Blueprint.
                  </p>
                </div>
                <div className="article-subsection-2" ref={Ref_4} id="classes-UBSGameplayAbility_TrackGun">
                  <BlogHeadingClass
                    baseClass="UBSGameplayAbility"
                    childClass="UBSGameplayAbility_TrackGun"
                    headingLevel={3}
                    childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/Abilities/BSGameplayAbility_TrackGun.cpp"
                  />
                  <p>
                    This the ability for dealing damage to targets for a game mode that uses Tracking Damage. I implemented some of this
                    class in C++ and some in Blueprint.
                  </p>
                </div>
              </div>
              <div className="article-subsection" ref={Ref_5} id="classes-UBSAttributeSetBase">
                <BlogHeadingClass
                  baseClass="UAttributeSet"
                  childClass="UBSAttributeSetBase"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/Globals/BSAttributeSetBase.cpp"
                />
                <p className="">
                  An Attribute Set is a group of stats that an actor with an AbilitySystemComponent has. BeatShot has several attributes,
                  including MaxHealth, Health, HitDamage, TrackingDamage, and TotalDamage.
                </p>
                <p className="">
                  MaxHealth and Health are regular attributes that are replicated, while the damage attributes are considered “meta”
                  attributes. Meta attributes only exist on the server and are used in BeatShot to calculate the damage that should be
                  applied to a target.
                </p>
                <ul>
                  In my implementation, attribute sets live in different places depending on the actor:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Attribute sets on targets reside on the actor itself (ATarget).
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Attribute sets on players reside in the Player State.
                  </li>
                </ul>
                <p className="">
                  FBSAttributeEvent is a delegate that I created that broadcasts any time an attribute is changed. Health and MaxHealth both
                  have one of these delegates (OnHealthChanged, OnMaxHealthChanged), but the damage attributes do not.
                </p>
              </div>
            </div>
            <div className="article-section" ref={Ref_6} id="gameplay-effects">
              <BlogHeading headingText="Gameplay Effects" headingLevel={1} />
              <p>
                I shouldn’t go any further without atleast introducing Gameplay Effects, so I’ll share the description from the{" "}
                <Link className="link text-light hover-white" href={"https://github.com/tranek/GASDocumentation"}>
                  GAS Documentation
                </Link>
                :
              </p>
              <blockquote className="otro-blockquote">
                GameplayEffects (GE) are the vessels through which abilities change Attributes and GameplayTags on themselves and others.
                They can cause immediate Attribute changes like damage or healing or apply long term status buff/debuffs like a movespeed
                boost or stunning. The UGameplayEffect class is a meant to be a data-only class that defines a single gameplay effect. No
                additional logic should be added to GameplayEffects. Typically designers will create many Blueprint child classes of
                UGameplayEffect.
              </blockquote>
              <p>
                Game modes that use Hit-Based damage always spawn targets with immunity to the Tracking Ability, and vice versa. Similarly,
                BeatGrid targets are immune to all types of damage while they are not activated. These various types of immunity are applied
                using infinite duration GEs. Each GE also applies a GameplayTag to the actor that describes the immunity.
              </p>
              <p>
                Any damage that is dealt in BeatShot is applied using an instant duration GE. This is discussed further in the
                UBSDamageExecCalc section.
              </p>
              <p>
                To apply a cooldown on firing a weapon (fire rate), a finite duration GE is supplied to the Gameplay Ability blueprint
                section “Cooldown Gameplay Effect Class”. It only contains the duration type along with a cooldown GameplayTag to apply to
                the ability user once it has been activated.
              </p>
            </div>
            <div className="article-section" ref={Ref_7} id="additional-classes">
              <BlogHeading headingText="Additional Classes" headingLevel={1} />
              <p>
                I used the Lyra Sample Project as a guide for implementing GAS, so I chose to include some additional classes that made
                things work better.
              </p>
              <div className="article-subsection" ref={Ref_8} id="classes-UBSAbilitySet">
                <BlogHeadingClass
                  baseClass="UDataAsset"
                  childClass="UBSAbilitySet"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/Globals/BSAbilitySet.cpp"
                />
                <p>
                  An ability set is just a grouping of Gameplay Abilities, Gameplay Effects, and Attribute Sets. This isn&#39;t strictly
                  necessary to implement, but it makes it easier to add additional abilities in the future that should be grouped with other
                  abilities. For example, the ability set granted when the player swaps to the knife includes three abilities: left click
                  melee, right click melee, and inspect.
                </p>
                <p>
                  I don&#39;t actually include any Gameplay Effects or Attribute Sets in my ability sets since they do not require any on
                  granted effects or need any additional attributes.
                </p>
                <p>
                  <BSInlineFunction className={"UBSAbilitySet"} functionName={"GiveToAbilitySystem"} /> is the primary reason I created this
                  class. It gives the ASC everything contained in the ability set and makes it easy to create groupings of abilities that
                  can be granted and removed to an ASC.
                </p>
              </div>
              <div className="article-subsection" ref={Ref_9} id="classes-UBSInputComponent">
                <BlogHeadingClass
                  baseClass="UEnhancedInputComponent"
                  childClass="UBSInputComponent"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/Input/BSInputComponent.cpp"
                />
                <p>
                  I chose to implement this class simply because I found the BindAbilityActions function in the Lyra Sample Project. This
                  function allows abilities to be bound to an Input Action and GameplayTag. These mappings are done through a data asset:
                </p>
                <div className="article-subsection" ref={Ref_10} id="classes-UBSInputConfig">
                  <BlogHeadingClass
                    baseClass="UDataAsset"
                    childClass="UBSInputConfig"
                    headingLevel={3}
                    childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/Input/BSInputConfig.cpp"
                  />
                  <p>
                    This data asset maps each InputAction to a unique GameplayTag. There are two categories: Native Input Actions and
                    Ability Input Actions.
                  </p>
                  <p>Native Input Actions are things like look, move, and walk that are not tied to an ability.</p>
                  <p>Ability Input Actions are bound to specific abilities.</p>
                  <p>
                    All Input Actions are bound to functions inside the Character class. Native Input Actions are bound to individual
                    specific functions, while Ablity Input Actions are all bound to:{" "}
                    <BSInlineFunction className={"ABSCharacter"} functionName={"Input_AbilityInputTagPressed"} /> and
                    <BSInlineFunction className={"ABSCharacter"} functionName={"Input_AbilityInputTagReleased"} />.
                  </p>
                  <p>
                    All of the Input Action binding occurs in{" "}
                    <BSInlineFunction className={"ABSCharacter"} functionName={"InitializePlayerInput"} />.
                  </p>
                  <p>
                    GameplayTags are used so that Input Actions can be bound to abilities that might not yet be granted. Of course, the
                    abilities themselves also need to refer to the GameplayTag corresponding to the correct Input Action.
                  </p>
                </div>
              </div>
              <div className="article-subsection" ref={Ref_11} id="classes-UBSDamageExecCalc">
                <BlogHeadingClass
                  baseClass="UGameplayEffectExecutionCalculation"
                  childClass="UBSDamageExecCalc"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/ExecutionCalculations/BSDamageExecCalc.cpp"
                />
                <p>
                  Instead of just &#34;Apply 100 damage by removing 100 health points&#34;, a Gameplay Effect Execution Calculation lets you
                  execute additional calculations, such as snapshotting various attributes from both the source and the target. Examples
                  could include taking armor, shield, or resistances into account. It also gives access to both the source and target
                  GameplayTags.
                </p>
              </div>
              <div className="article-subsection" ref={Ref_12} id="classes-UBSHealthComponent">
                <BlogHeadingClass
                  baseClass="UActorComponent"
                  childClass="UBSHealthComponent"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/Character/BSHealthComponent.cpp"
                />
                <p>
                  This component is added to any actors where keeping track of their current health is important. In my case, this is just
                  added to targets.
                </p>
                <p>
                  To be honest, the Health Component is kind of unnecessary since the target could just bind to the
                  UBSAttributeSetBase&#39;s OnHealthChanged delegate directly, but if I wanted to add additional actors that use
                  HealthComponents in the future, it would be less coding in the long run.
                </p>
              </div>
            </div>
            <div className="article-section" ref={Ref_13} id="timeline">
              <BlogHeading headingText="Timeline" headingLevel={1} />
              <p>
                For this section, I wanted to detail exactly what happens when the player in BeatShot shoots a target in a Hit-Based. This
                means that that the ability/GA used throughout this section will always be{" "}
                <BSInlineFunction className={"UBSGameplayAbility_FireGun"} />.
              </p>
              <div className="article-subsection" ref={Ref_14} id="timeline-Input">
                <BlogHeading headingText="Input" headingLevel={2} />
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Player presses the key or mouse that is bound to an Input Action.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <BSInlineFunction functionName={"Input_AbilityInputTagPressed"} /> is called on the character, which simply calls{" "}
                    <BSInlineFunction functionName={"AbilityInputTagPressed"} /> on the character&#39;s ASC. If the ASC finds an activatable
                    GA with the matching GameplayTag, the Gameplay Ability Handle (GAHandle) is added to InputPressedSpecHandles. These
                    InputPressedSpecHandles get processed in <BSInlineFunction functionName={"ProcessAbilityInput"} />. This function is
                    called from the player controller, specifically <BSInlineFunction functionName={"PostProcessInput"} />.
                  </li>
                </ul>
              </div>
              <div className="article-subsection" ref={Ref_15} id="timeline-AbilityActivation">
                <BlogHeading headingText="Ability Activation" headingLevel={2} />
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    If an activatable ability was found in the ASC, <BSInlineFunction functionName={"TryActivateAbility"} /> is called,
                    which begins a series of internal function calls that eventually end up calling{" "}
                    <BSInlineFunction functionName={"ActivateAbility"} /> on <BSInlineFunction className={"UBSGameplayAbility_FireGun"} />.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    The C++ version of <BSInlineFunction functionName={"ActivateAbility"} /> doesn’t do anything noteworthy but the
                    blueprint version does. It begins by calling <BSInlineFunction functionName={"StartTargeting"} />, which is implemented
                    in C++ and is discussed in the next section.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Next, the blueprint version of <BSInlineFunction functionName={"PlayMontageAndWait"} /> is executed using the Animation
                    Montage for the weapon recoil. It also sets a timer equal to the fire rate of the weapon, which ends the ability when
                    the timer expires. If this wasn’t here, the ability wouldn’t be activatable until the montage was finished playing since
                    nothing else is calling EndAbility.
                  </li>
                </ul>
                <div className="blueprint-container">
                  <iframe className="blueprint" src="https://blueprintue.com/render/ojtm4x9n/" allowfullscreen></iframe>
                  <figcaption>
                    <p className="figlabel">Blueprint Graph 1: </p>
                    <BSInlineFunction className="UBSGameplayAbility_FireGun" functionName={"K2_ActivateAbility"} />
                  </figcaption>
                </div>
                <div className="article-subsection-2" ref={Ref_16} id="timeline-StartTargeting">
                  <BlogHeading color="color-green" headingText="StartTargeting" headingLevel={4} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      This function's main purpose is to create the structure that holds the targeting data. This comes in the form of an{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetDataHandle"} />, which holds an array of pointers to{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} />.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} /> is meant to be subclassed to allow passing data across
                      the network and GAS comes with several but the one used here is{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetData_SingleTargetHit"} /> since it allows passing a HitResult.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The HitResult is obtained by calling <BSInlineFunction functionName={"SingleWeaponTrace"} />, which traces a single
                      line using a collision channel I created that ignores any pawn or weapon meshes. The start of the trace begins at the
                      player’s Camera Component, some maths are done to find end location, and{" "}
                      <BSInlineFunction className="UWorld" functionName="SingleWeaponTrace" /> is called to get the HitResult.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The last thing <BSInlineFunction functionName={"StartTargeting"} /> does is call{" "}
                      <BSInlineFunction functionName={"OnTargetDataReadyCallback"} />.
                    </li>
                  </ul>
                </div>
                <div className="article-subsection-2" ref={Ref_17} id="timeline-OnTargetDataReadyCallback">
                  <BlogHeading color="color-green" headingText="OnTargetDataReadyCallback" headingLevel={4} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      This function does some more networking stuff like creating a ScopedPredictionWindow and RPC the target data to the
                      server, but I&#39;m no expert on these topics since I just copied them from the Lyra Example Project.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Finally, <BSInlineFunction functionName={"CommitAbility"} /> is called on the GA. This is where any cooldowns or costs
                      associated with the ability are checked. The cooldown for FireGun is the same as the weapon’s fire rate, but there is
                      no cost to firing the weapon since BeatShot’s weapons have unlimited ammo. If{" "}
                      <BSInlineFunction functionName={"CommitAbility"} /> returns false, the ability is ended, otherwise{" "}
                      <BSInlineFunction functionName={"OnTargetDataReady"} /> is called. This function is implemented in the{" "}
                      <BSInlineFunction className={"UBSGameplayAbility_FireGun"} /> blueprint.
                    </li>
                  </ul>
                </div>
                <div className="article-subsection-2" ref={Ref_18} id="timeline-OnTargetDataReady">
                  <BlogHeading color="color-green" headingText="OnTargetDataReady" headingLevel={4} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The <BSInlineFunction className={"FGameplayAbilityTargetDataHandle"} /> is the only parameter passed to this function,
                      which is what <BSInlineFunction functionName={"StartTargeting"} /> created earlier.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      If the HitResult contained a blocking hit, a <BSInlineFunction className={"FGameplayEffectSpec"} /> is creating using{" "}
                      <BSInlineFunction functionName={"MakeOutgoingGameplayEffectSpec"} /> with the input{" "}
                      <BSInlineFunction className={"UGameplayEffect"} /> class being an instant GE containing only{" "}
                      <BSInlineFunction className={"BSDamageExecCalc"} /> as an execution.{" "}
                      <BSInlineFunction className={"ApplyGameplayEffectSpecToTarget"} /> is called using the GESpec and target data.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The <BSInlineFunction functionName={"ExecuteGameplayCueWithParamsOnOwner"} /> blueprint function is called using the
                      HitResult as a parameter and the Gameplay Cue Tag of “GameplayCue.FireGun”.
                    </li>
                  </ul>
                  <div className="blueprint-container">
                    <iframe className="blueprint" src="https://blueprintue.com/render/hoqr4itn/" allowfullscreen></iframe>
                    <figcaption>
                      <p className="figlabel">Blueprint Graph 2: </p>
                      <BSInlineFunction className="UBSGameplayAbility_FireGun" functionName={"OnTargetDataReady"} />
                    </figcaption>
                  </div>
                </div>
                <div className="article-subsection-2" ref={Ref_19} id="timeline-GameplayCues">
                  <BlogHeading headingText="Gameplay Cues" headingLevel={2} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      GameplayCues allow non-gameplay related tasks to execute like effects, decals, etc. You can trigger them through GEs
                      or directly like I did in Blueprint Graph 2. I chose not to use a GE because I always want GameplayCue.FireGun to
                      trigger any time the ability is activated regardless of the GE application success.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      I chose to use a <BSInlineFunction className="UGameplayCueNotify_Burst" /> since its meant to be used for one-off
                      events. <BSInlineFunction className="AGameplayCueNotify_Actor" /> is another version that is actually spawned in the
                      world, but that is not used in this example.
                    </li>
                  </ul>
                  <div className="article-subsection-2" ref={Ref_20} id="timeline-GCNWeaponFire">
                    <BlogHeading headingText="GCN_WeaponFire and BP_WeaponFire" headingLevel={3} />
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                        <BSInlineFunction className="GCN_WeaponFire" /> is the <BSInlineFunction className="UGameplayCueNotify_Burst" />{" "}
                        blueprint class that handles the GameplayCue.FireGun response. First, Fire is called on the character’s weapon to
                        increment the total shots fired by the player.
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                        Next, recoil is applied to the character if the gun has a GameplayTag that denotes if recoil should be used.
                      </li>

                      <li>
                        <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                        Finally, Fire_BP is called on the weapon, and the Impact Position and Impact Normal from the HitResult are passed as
                        parameters. This function is responsible for spawning the <BSInlineFunction className="WeaponFire" /> blueprint
                        class, as well as updating a few variables inside that instruct whether or not and where to spawn the various
                        effects.
                      </li>
                      <div className="blueprint-container">
                        <iframe className="blueprint" src="https://blueprintue.com/render/pqprz-_7/" allowfullscreen></iframe>
                        <figcaption>
                          <p className="figlabel">Blueprint Graph 3: </p>
                          <BSInlineFunction className="GameplayCueNotify_Burst" functionName={"OnBurst"} />
                        </figcaption>
                      </div>
                      <li>
                        <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                        <BSInlineFunction className="WeaponFire" /> manages the bullet tracers, muzzle flash, and decals. A separate actor
                        is used so that if the character swaps to the knife, the effects are still managed without relying on the weapon.
                        There isn’t much too much going on here besides calling <BSInlineFunction functionName="SpawnSystemAttached" /> and{" "}
                        <BSInlineFunction functionName="SpawnDecal" />.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="article-subsection" ref={Ref_20} id="timeline-AbilityExecution">
                <BlogHeading headingText="Ability Execution" headingLevel={2} />
                <p>
                  This sections picks back up where <BSInlineFunction className={"OnTargetDataReady"} /> left off when it called{" "}
                  <BSInlineFunction functionName={"ApplyGameplayEffectSpecToTarget"} />. When a{" "}
                  <BSInlineFunction className={"FGameplayEffectSpec"} /> is initialized,{" "}
                  <BSInlineFunction functionName={"SetupAttributeCaptureDefinitions"} />. This informs the GESpec on what attributes to
                  capture from the source inside <BSInlineFunction functionName={"CaptureDataFromSource"} /> and from the target inside
                  TODO.
                </p>
                <div className="article-subsection-2" ref={Ref_21} id="timeline-ApplyingTheGE">
                  <BlogHeading headingText="Applying The GameplayEffect" headingLevel={3} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      There’s actually three <BSInlineFunction functionName={"ApplyGameplayEffectSpecToTarget"} /> functions that are
                      called, starting with the one owned by GA. It then calls the{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} /> version, which then duplicates the GESpec and context.
                      When setting the context, <BSInlineFunction functionName={"CaptureDataFromSource"} /> is called once again. Then it
                      calls the ASC version for each targeted actor, but there will only be one in this example.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      ApplyGameplayEffectSpecToSelf is called on the target ASC. In this example, it’s the ATarget’s ASC.
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          This is where application immunity is checked against any active gameplay effects, and the chance to apply the
                          effect is calculated (always 100% in this example). Application Tag Requirements, Removal Tag Requirements, and
                          Custom Application Requirements are also checked here. (none here)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      From what I’ve gathered,{" "}
                      <BSInlineFunction className={"FActiveGameplayEffectsContainer"} functionName={"ApplyGameplayEffectSpec"} /> is called
                      when the duration type of the GE is infinite.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"UBSAbilitySystemComponent"} functionName={"ExecuteGameplayEffect"} /> is called when the
                      duration type of a GE is instant, OR the GE is applying a Periodic Effect.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Duration and Infinite GameplayEffects have the option of applying Periodic Effects, which are treated like Instant GEs
                      that occur at fixed intervals.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Since this is an instant GE, <BSInlineFunction functionName={"ExecuteGameplayEffect"} /> is called.
                    </li>
                    <div className="article-subsection-2" ref={Ref_21} id="timeline-ApplyingTheGE">
                      <BlogHeading headingText="Executing the GameplayEffect" headingLevel={3} />
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          This is the main function that executes a GE on attributes and active gameplay effects. It calls{" "}
                          <BSInlineFunction functionName={"ExecuteActiveEffectsFrom"} /> on the{" "}
                          <BSInlineFunction className={"FActiveGameplayEffectsContainer"} /> container within the ASC.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          Any modifiers and executions on the GE are executed here.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          If GEExecution wants conditional effects to trigger, those are applied here. (None for this example).
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          Any effects that should be removed on application of this GE are removed here.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          The target ASC OnGameplayEffectAppliedToSelf is broadcast and the instigator ASC’s OnGameplayEffectAppliedToTarget
                          is broadcast.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          As previously mentioned, BeatShot uses two types of damage: Hit and Tracking. These attributes are snapshotted
                          from the source (damage causer) during initialization of the of GESpec.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          <BSInlineFunction className={"UBSDamageExecCalc"} functionName={"Execute_Implementation"} /> is where the
                          calculation takes place.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          The calculation first accesses the source and target GameplayTags. This tells the calculation which kinds of
                          immunity, if any, the target has. If the target is Immune to Hit Damage, the Hit Damage Attribute that was
                          captured from the source is not used in the damage calculation. Similarly, if the target is immune to Tracking
                          Damage, the Tracking Damage Attribute is not used.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          Instead of using a Gameplay Effect Execution like the Figure below, I could have used a Gameplay Effect Modifier.
                          You can also use both.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          If the EndAbility is called, the blueprint clears the timer that was set on activation and calls StopFire on the
                          character’s weapon and StopRecoil on the Recoil Component.
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="article-subsection">
              <p className="inline posted-date">
                <span className="inline text-light">Posted:</span> September 8, 2023
                <br></br>
                <time dateTime="2023-09-08">
                  <span className="inline text-light">Updated:</span> September 8, 2023
                </time>
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default GameplayAbilitySystem;
