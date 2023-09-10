"use client";
import { useRef } from "react";
import image_Hero from "../../public/SpawnMemory_Hero_Cropped.png";
import useOnScreen from "../../hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "../SidebarHashLink";
import DA_InputConfig from "../../public/DA_InputConfig.png";
import DA_KnifeAbilitySet from "../../public/DA_KnifeAbilitySet.png";
import { BSCodeBlock, BSInlineCodeBlock, BSInlineEnum, BSInlineFunction } from "../CodeBlock";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogHeadingClass, BlogHeading } from "./BlogComponents/BlogHeading";
import { BlueprintGraph } from "./BlogComponents/BlueprintGraph";
import Sidebar from "../Sidebar";

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
  const Ref_25 = useRef(null);

  const onScreen_0 = useOnScreen(Ref_0);
  const onScreen_1 = useOnScreen(Ref_1);
  const onScreen_2 = useOnScreen(Ref_2);
  const onScreen_3 = useOnScreen(Ref_3);
  const onScreen_4 = useOnScreen(Ref_4);
  const onScreen_5 = useOnScreen(Ref_5);
  const onScreen_6 = useOnScreen(Ref_6);
  const onScreen_7 = useOnScreen(Ref_7);
  const onScreen_8 = useOnScreen(Ref_8);
  const onScreen_9 = useOnScreen(Ref_9);
  const onScreen_10 = useOnScreen(Ref_10);
  const onScreen_11 = useOnScreen(Ref_11);
  const onScreen_12 = useOnScreen(Ref_12);
  const onScreen_13 = useOnScreen(Ref_13);
  const onScreen_14 = useOnScreen(Ref_14);
  const onScreen_15 = useOnScreen(Ref_15);
  const onScreen_16 = useOnScreen(Ref_16);
  const onScreen_17 = useOnScreen(Ref_17);
  const onScreen_18 = useOnScreen(Ref_18);
  const onScreen_19 = useOnScreen(Ref_19);
  const onScreen_20 = useOnScreen(Ref_20);
  const onScreen_21 = useOnScreen(Ref_21);
  const onScreen_22 = useOnScreen(Ref_22);
  const onScreen_23 = useOnScreen(Ref_23);
  const onScreen_24 = useOnScreen(Ref_24);
  const onScreen_25 = useOnScreen(Ref_25);

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
          <Sidebar>
            <ul>
              <li>
                <SidebarHashLink hash={`#gas-subclasses`} text="GAS Subclasses" onScreen={onScreen_0} topLevelLink={true} />
                <ul>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UAbilitySystemComponent`}
                      text="Ability System Component"
                      onScreen={onScreen_0 && onScreen_1}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UGameplayAbility`}
                      text="Gameplay Ability"
                      onScreen={onScreen_0 && !onScreen_1 && onScreen_2}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          hash={`#classes-UBSGameplayAbility_FireGun`}
                          text="Fire Gun"
                          onScreen={onScreen_0 && !onScreen_1 && onScreen_2 && onScreen_3}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          hash={`#classes-UBSGameplayAbility_TrackGun`}
                          text="Track Gun"
                          onScreen={onScreen_0 && !onScreen_1 && onScreen_2 && !onScreen_3 && onScreen_4}
                        />
                      </li>
                    </ul>
                    <li>
                      <SidebarHashLink hash={`#classes-UBSAttributeSetBase`} text="Attribute Set" onScreen={!onScreen_2 && onScreen_5} />
                    </li>
                  </li>
                </ul>
              </li>
              <li>
                <SidebarHashLink
                  hash={`#gameplay-effects`}
                  text="Gameplay Effects"
                  onScreen={!onScreen_0 && onScreen_6}
                  topLevelLink={true}
                />
                <ul>
                  <li>
                    <SidebarHashLink hash={`#ge-infinite`} text="Target Immunity" onScreen={!onScreen_0 && onScreen_6 && onScreen_22} />
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#fire-cooldown`}
                      text="Fire Gun Cooldown"
                      onScreen={!onScreen_0 && onScreen_6 && !onScreen_22 && onScreen_23}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <SidebarHashLink
                  hash={`#additional-classes`}
                  text="Additional Classes"
                  onScreen={!onScreen_6 && onScreen_7}
                  topLevelLink={true}
                />
                <ul>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UBSAbilitySet`}
                      text="Ability Set"
                      onScreen={!onScreen_6 && onScreen_7 && onScreen_8}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UBSInputComponent`}
                      text="Enhanced Input Component"
                      onScreen={!onScreen_6 && onScreen_7 && !onScreen_8 && onScreen_9}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          hash={`#classes-UBSInputConfig`}
                          text="Input Config"
                          onScreen={!onScreen_6 && onScreen_7 && !onScreen_8 && onScreen_9 && onScreen_10}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UBSDamageExecCalc`}
                      text="Damage Exec Calc"
                      onScreen={onScreen_7 && !onScreen_9 && onScreen_11}
                    />
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#classes-UBSHealthComponent`}
                      text="Health Component"
                      onScreen={onScreen_7 && !onScreen_11 && onScreen_12}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <SidebarHashLink hash={`#timeline`} text="Timeline" onScreen={!onScreen_7 && onScreen_13} topLevelLink={true} />
                <ul>
                  <li>
                    <SidebarHashLink hash={`#timeline-Input`} text="Input" onScreen={!onScreen_7 && onScreen_13 && onScreen_14} />
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#timeline-AbilityActivation`}
                      text="Ability Activation"
                      onScreen={onScreen_13 && !onScreen_14 && onScreen_15}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-StartTargeting`}
                          text="Start Targeting"
                          onScreen={onScreen_13 && !onScreen_14 && onScreen_15 && onScreen_16}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-OnTargetDataReadyCallback`}
                          text="On Target Data Ready Callback"
                          onScreen={onScreen_13 && onScreen_15 && !onScreen_16 && onScreen_17}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-OnTargetDataReady`}
                          text="On Target Data Ready"
                          onScreen={onScreen_13 && onScreen_15 && !onScreen_16 && !onScreen_17 && onScreen_18}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#timeline-AbilityExecution`}
                      text="Ability Execution"
                      onScreen={onScreen_13 && !onScreen_15 && onScreen_21}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-ApplyingTheGE`}
                          text="GE Application"
                          onScreen={onScreen_13 && !onScreen_15 && onScreen_21 && onScreen_24}
                        />
                      </li>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-ExecutingTheGE`}
                          text="GE Execution"
                          onScreen={onScreen_13 && !onScreen_15 && onScreen_21 && !onScreen_24 && onScreen_25}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <SidebarHashLink
                      hash={`#timeline-GameplayCues`}
                      text="Gameplay Cues"
                      onScreen={onScreen_13 && !onScreen_21 && onScreen_19}
                    />
                    <ul>
                      <li>
                        <SidebarHashLink
                          hash={`#timeline-GCNWeaponFire`}
                          text="Weapon Fire"
                          onScreen={onScreen_13 && !onScreen_21 && onScreen_19 && onScreen_20}
                        />
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </Sidebar>
          <article className="flex-container-column" id="article">
            <p>From the Unreal Engine Docs:</p>
            <blockquote className="otro-blockquote">
              The Gameplay Ability System is a framework for building attributes, abilities, and interactions that an Actor can own and
              trigger. The system is designed to be adapted to a wide variety of Gameplay-Driven projects such as Role-Playing Games(RPGs),
              Action-Adventure games, and Multiplayer Online Battle Arenas games(MOBA). Using this system, you can create abilities like a
              single attack, or add more complexity like a spell that triggers many status effects depending on data from the user and the
              targets.
            </blockquote>
            <p>
              It might not sound like the Gameplay Ability System (<p className="inline text-light">GAS</p>) has a reason to be in BeatShot.
              However, the two damage types in BeatShot (hit and tracking) are separate abilities created in the framework. Shooting a
              weapon could have easily been accomplished with <p className="inline text-light">GAS</p>, and it was that way at first. I
              simply wanted to learn how abilities worked in Unreal, and this article describes how I&#39;ve implemented it along with
              showing what actually happens during the game when you shoot the weapon. I learned much of what I know about{" "}
              <p className="inline text-light">GAS</p> from this incredible{" "}
              <Link className="link text-light hover-white" href={"https://github.com/tranek/GASDocumentation"}>
                GASDocumentation
              </Link>{" "}
              from the community (its massive). I&#39;m not looking to do the same thing here, but instead show an example implementation
              and execution.
            </p>
            <div className="article-section" ref={Ref_0} id="gas-subclasses">
              <BlogHeading headingText="GAS Subclasses" headingLevel={1} />
              <p>
                Many of the classes that are part of <p className="inline text-light">GAS</p> are meant to be subclassed in C++. In this
                section, I&#39;ll introduce the most necessary classes that BeatShot overrides.
              </p>
              <div className="article-subsection" ref={Ref_1} id="classes-UAbilitySystemComponent">
                <BlogHeadingClass
                  baseClass="UAbilitySystemComponent"
                  childClass="UBSAbilitySystemComponent"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/AbilitySystem/BSAbilitySystemComponent.cpp"
                />
                <p>
                  The Ability System Component (<p className="inline text-light">ASC</p>) is added to any actor that wants to interact with{" "}
                  <p className="inline text-light">GAS</p>. For BeatShot, the only actors that have{" "}
                  <p className="inline text-light">ASCs</p> are the character and targets.
                </p>
                <ul>
                  <p>
                    In my implementation, the <p className="inline text-light">ASC</p> lives in different places depending on the actor:
                  </p>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <p className="inline text-light">ASCs</p> on targets reside on the actor itself (
                    <BSInlineFunction className={"ATarget"} />
                    ).
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <p className="inline text-light">ASCs</p> on the character reside in the Player State (
                    <BSInlineFunction className={"ABSPlayerState"} />
                    ).
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
                <p>
                  A Gameplay Ability (<p className="inline text-light">GA</p>) is an action or skill that an actor can perform in game.
                </p>
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
                    This is the ability for shooting the gun in a game mode that uses Hit-Based Damage. I implemented some of this class in
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
                    This is the ability for dealing damage to targets for a game mode that uses Tracking Damage. I implemented some of this
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
                  An Attribute Set is a group of stats that an actor with an <p className="inline text-light">ASC</p> has. BeatShot has
                  several attributes, including MaxHealth, Health, HitDamage, TrackingDamage, and TotalDamage.
                </p>
                <p className="">
                  MaxHealth and Health are regular attributes that are replicated, while all damage attributes are considered{" "}
                  <p className="inline text-light">Meta</p> attributes. Meta attributes only exist on the server and are used in BeatShot to
                  calculate the damage that should be applied to a target.
                </p>
                <ul>
                  In my implementation, attribute sets live in different places depending on the actor:
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Attribute sets on targets reside on the actor itself (<BSInlineFunction className={"ATarget"} />
                    ).
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    Attribute sets on characters reside in the Player State <BSInlineFunction className={"ABSPlayerState"} />.
                  </li>
                </ul>
                <p className="">
                  <BSInlineFunction className={"FBSAttributeEvent"} /> is a delegate that I created that broadcasts any time an attribute is
                  changed. Health and MaxHealth both have one of these delegates (<BSInlineFunction className={"OnHealthChanged"} />,{" "}
                  <BSInlineFunction className={"OnMaxHealthChanged"} />
                  ), but the damage attributes do not.
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
                GameplayEffects (GE) are the vessels through which abilities change Attributes and{" "}
                <p className="inline text-light">Gameplay Tags</p> on themselves and others. They can cause immediate Attribute changes like
                damage or healing or apply long term status buff/debuffs like a movespeed boost or stunning. The UGameplayEffect class is a
                meant to be a data-only class that defines a single gameplay effect. No additional logic should be added to GameplayEffects.
                Typically designers will create many Blueprint child classes of UGameplayEffect.
              </blockquote>
              <p>
                Any damage that is dealt in BeatShot is applied using an instant duration <p className="inline text-light">GE</p>. This is
                discussed further in the{" "}
                <Link className="link text-light hover-white" href={"#classes-UBSDamageExecCalc"}>
                  UBSDamageExecCalc section
                </Link>
                .
              </p>
              <div className="article-subsection" id="ge-infinite" ref={Ref_22}>
                <BlogHeading headingText="Target Immunity" headingLevel={2} />
                <p>
                  <p className="inline text-light">GEs</p> have a property called{" "}
                  <p className="inline text-light">Granted Application Immunity Tags</p> which grant the owner immunity to any matching{" "}
                  <p className="inline text-light">GAs</p> that have the same <p className="inline text-light">Ability Tag</p>.
                </p>
                <p>
                  Game modes that use Hit-Based damage spawn targets with immunity to the Tracking Ability (and consequently Tracking
                  Damage). These targets will have the corresponding <p className="inline text-light">Ability Tag</p> of{" "}
                  <p className="inline text-light">Ability.Track</p> in their{" "}
                  <p className="inline text-light">Granted Application Immunity Tags</p>.
                </p>
                <p>
                  Targets can also be immune to all damage, such as before a game mode starts or if a Target Activation/Deactivation
                  Response involves removing or applying immunity. These various types of immunity are applied using infinite duration{" "}
                  <p className="inline text-light">GEs</p>, and are typically called directly on the target itself using{" "}
                  <BSInlineFunction functionName="ApplyGameplayEffectToSelf" />.
                </p>
              </div>
              <div className="article-subsection" id="fire-cooldown" ref={Ref_23}>
                <BlogHeading headingText="Fire Cooldown" headingLevel={2} />
                <p>
                  To apply a cooldown to the Fire Gun Ability, or basically fire rate, a finite duration{" "}
                  <p className="inline text-light">GE</p> is supplied to the <p className="inline text-light">GA</p> blueprint property{" "}
                  <p className="inline text-light">Cooldown Gameplay Effect Class</p>. This <p className="inline text-light">GE</p> has the
                  following blueprint properties:
                </p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <p className="inline text-light">Duration Policy</p>: Has Duration
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <p className="inline text-light">Scalable Float Magnitude</p>: fire rate of the weapon
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    <p className="inline text-light">Granted Tags</p>: Data.Cooldown is added
                  </li>
                </ul>
                <p>I use a generic universal cooldown but that might change in the future.</p>
              </div>
            </div>
            <div className="article-section" ref={Ref_7} id="additional-classes">
              <BlogHeading headingText="Additional Classes" headingLevel={1} />
              <p>
                I used the{" "}
                <Link
                  className="link text-light hover-white"
                  href={"https://docs.unrealengine.com/5.3/en-US/lyra-sample-game-in-unreal-engine/"}
                >
                  Lyra Sample Project
                </Link>{" "}
                as a guide for implementing GAS, so I chose to include some additional classes that made things work better.
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
                  class. It gives the <p className="inline text-light">ASC</p> everything contained in the ability set and makes it easy to
                  create groupings of abilities that can be granted and removed to an <p className="inline text-light">ASC</p>.
                </p>
                <figure>
                    <div className="figure-border-container max-width-1000">
                      <Image src={DA_KnifeAbilitySet} quality={100} alt="DA_KnifeAbilitySet" />
                      <figcaption>
                        <p className="figlabel">Figure 1: </p>
                        The Ability Set for the when the character has a knife equipped.
                      </figcaption>
                    </div>
                  </figure>
              </div>
              <div className="article-subsection" ref={Ref_9} id="classes-UBSInputComponent">
                <BlogHeadingClass
                  baseClass="UEnhancedInputComponent"
                  childClass="UBSInputComponent"
                  headingLevel={2}
                  childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/Input/BSInputComponent.cpp"
                />
                <p>
                  I chose to implement this class simply because I found the <BSInlineFunction functionName={"BindAbilityActions"} />{" "}
                  function in the Lyra Sample Project. This function allows abilities to be bound to an{" "}
                  <p className="inline text-light">Input Action</p> and <p className="inline text-light">Gameplay Tag</p>. These mappings
                  are done through the data asset <BSInlineFunction className={"UBSInputConfig"} />.
                </p>
                <div className="article-subsection" ref={Ref_10} id="classes-UBSInputConfig">
                  <BlogHeadingClass
                    baseClass="UDataAsset"
                    childClass="UBSInputConfig"
                    headingLevel={3}
                    childClassLink="https://github.com/markoleptic/BeatShot/blob/develop/Source/BeatShot/Private/Input/BSInputConfig.cpp"
                  />
                  <p>
                    This data asset maps each <p className="inline text-light">Input Action</p> to a unique{" "}
                    <p className="inline text-light">Input Tag</p> (<p className="inline text-light">Gameplay Tag</p>). All{" "}
                    <p className="inline text-light">Input Actions</p> are bound to functions inside the{" "}
                    <BSInlineFunction className={"ABSCharacter"} /> class, and are bound during{" "}
                    <BSInlineFunction functionName={"InitializePlayerInput"} />. There are two categories:
                  </p>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <p className="inline text-light">Native Input Actions</p> are things like look, move, and walk. They are not tied to
                      an ability. Each of these are bound to unique functions.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <p className="inline text-light">Ability Input Actions</p> are bound to specific abilities. All of these are all bound
                      to the same functions: <BSInlineFunction functionName={"Input_AbilityInputTagPressed"} /> and{" "}
                      <BSInlineFunction functionName={"Input_AbilityInputTagReleased"} />.
                    </li>
                  </ul>
                  <p>
                    <p className="inline text-light">Input Tags</p> are used so that <p className="inline text-light">Input Actions</p> can
                    be bound to abilities that might not yet be granted. I use the blueprint property{" "}
                    <p className="inline text-light">Ability Tags</p> on <p className="inline text-light">GA</p> blueprints to associate the
                    action with the ability. For example, the Fire Gun blueprint <p className="inline text-light">Ability Tags</p> are{" "}
                    <p className="inline text-light">Ability.Fire</p> and <p className="inline text-light">Input.Fire</p>.
                  </p>
                  <figure className="max-width-1000">
                    <div className="figure-border-container">
                      <Image src={DA_InputConfig} quality={100} alt="DA_InputConfig" />
                      <figcaption>
                        <p className="figlabel">Figure 2: </p>
                        The input configuration for a character in BeatShot.
                      </figcaption>
                    </div>
                  </figure>
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
                  could include taking armor, shield, or resistances into account. It also gives access to both the source and target{" "}
                  <p className="inline text-light">Gameplay Tags</p>.
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
                  To be honest, the Health Component is kind of unnecessary since the target could just bind to the{" "}
                  <BSInlineFunction className={"UBSAttributeSetBase"} />
                  &#39;s <BSInlineFunction className={"OnHealthChanged"} /> delegate directly, but if I wanted to add additional actors that
                  use Health Components in the future, it would be less coding in the long run.
                </p>
              </div>
            </div>
            <div className="article-section" ref={Ref_13} id="timeline">
              <BlogHeading headingText="Timeline" headingLevel={1} />
              <p>
                For this section, I detail what happens when the player in BeatShot shoots a target in a Hit-Based game mode. This means
                that that the <p className="inline text-light">GA</p> used throughout this section will always be{" "}
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
                    <BSInlineFunction functionName={"AbilityInputTagPressed"} /> on the character&#39;s{" "}
                    <p className="inline text-light">ASC</p>. If the <p className="inline text-light">ASC</p> finds an activatable{" "}
                    <p className="inline text-light">GA</p> with the matching <p className="inline text-light">Ability Tag</p>, the{" "}
                    <p className="inline text-light">Gameplay Ability Handle</p> is added to InputPressedSpecHandles. These get processed in{" "}
                    <BSInlineFunction functionName={"ProcessAbilityInput"} />. This function is called from the player controller inside{" "}
                    <BSInlineFunction functionName={"PostProcessInput"} />.
                  </li>
                </ul>
              </div>
              <div className="article-subsection" ref={Ref_15} id="timeline-AbilityActivation">
                <BlogHeading headingText="Ability Activation" headingLevel={2} />
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    If an activatable ability was found in the <p className="inline text-light">ASC</p>,{" "}
                    <BSInlineFunction functionName={"TryActivateAbility"} /> is called, which begins a series of internal function calls
                    that eventually end up calling <BSInlineFunction functionName={"ActivateAbility"} /> on{" "}
                    <BSInlineFunction className={"UBSGameplayAbility_FireGun"} />.
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                    The C++ version of <BSInlineFunction functionName={"ActivateAbility"} /> doesn’t do anything noteworthy but the
                    blueprint version calls <BSInlineFunction functionName={"StartTargeting"} />, which is implemented in C++ and is
                    discussed in the next section. It also calls the blueprint version of{" "}
                    <BSInlineFunction functionName={"PlayMontageAndWait"} /> which plays the Animation Montage for the weapon recoil.{" "}
                    <BSInlineFunction functionName={"PlayMontageAndWait"} /> will call <BSInlineFunction functionName={"EndAbility"} /> if
                    it is able to finish the animation before the ability ends, but this should never be the case.
                  </li>
                </ul>
                <div className="article-subsection-2" ref={Ref_16} id="timeline-StartTargeting">
                  <BlogHeading color="color-green" headingText="StartTargeting" headingLevel={4} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      This function&#39;s main purpose is to create the structure that holds the targeting data. This comes in the form of
                      an <BSInlineFunction className={"FGameplayAbilityTargetDataHandle"} />, which holds an array of pointers to{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} />.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} /> allows passing data across the network. GAS comes with
                      several subclassed versions, but the one used here is{" "}
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
                      <BSInlineFunction functionName={"CommitAbility"} /> is called on the <p className="inline text-light">GA</p>. This is
                      where any cooldowns or costs associated with the ability are checked. The cooldown for FireGun is the same as the
                      weapon’s fire rate, but there is no cost to firing the weapon since BeatShot’s weapons have unlimited ammo. If{" "}
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
                      If the HitResult contained a blocking hit, an <BSInlineFunction className={"FGameplayEffectSpec"} /> (
                      <p className="inline text-light">GESpec</p>) is creating using{" "}
                      <BSInlineFunction functionName={"MakeOutgoingGameplayEffectSpec"} /> with the input{" "}
                      <p className="inline text-light">GE</p> containing the blueprint properties:
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          <p className="inline text-light">Duration Policy</p>: Instant
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          <p className="inline text-light">Executions</p>: The C++ class <BSInlineFunction className={"BSDamageExecCalc"} />{" "}
                          is added
                        </li>
                      </ul>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"ApplyGameplayEffectSpecToTarget"} /> is called using the{" "}
                      <p className="inline text-light">GESpec</p> and target data.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The <BSInlineFunction functionName={"ExecuteGameplayCueWithParamsOnOwner"} /> blueprint function is called using the
                      HitResult as a parameter and the <p className="inline text-light">Gameplay Cue Tag</p> of{" "}
                      <p className="inline text-light">GameplayCue.FireGun</p>. The{" "}
                      <Link className="link text-light hover-white" href={"#timeline-GameplayCues"}>
                        Gameplay Cues section
                      </Link>{" "}
                      goes over what happens when this is called.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"EndAbility"} /> is called after execution of the <p className="inline text-light">GE</p>{" "}
                      and <p className="inline text-light">GC</p>.
                    </li>
                  </ul>
                  <BlueprintGraph
                    bpLink="https://blueprintue.com/render/hoqr4itn/"
                    label="Blueprint Graph 1"
                    description={<BSInlineFunction className="UBSGameplayAbility_FireGun" functionName={"OnTargetDataReady"} />}
                  />
                </div>
              </div>
              <div className="article-subsection" ref={Ref_21} id="timeline-AbilityExecution">
                <BlogHeading headingText="Ability Execution" headingLevel={2} />
                <p>
                  A <p className="inline text-light">GESpec</p> is essentially just a modifiable instance of a{" "}
                  <p className="inline text-light">GE</p> since a <p className="inline text-light">GE</p> is a data-only class.
                </p>
                <p>
                  Inside its <BSInlineFunction functionName={"Initialize"} /> function, it sets the context and performs other prep-related
                  tasks. One of these tasks is calling <BSInlineFunction functionName={"CaptureDataFromSource"} />. This informs the{" "}
                  <p className="inline text-light">GESpec</p> which attributes to capture from the source. This can be called multiple times
                  depending on source target setup. Target attributes are captured in{" "}
                  <BSInlineFunction className={"FActiveGameplayEffectsContainer"} functionName={"ApplyGameplayEffectSpec"} /> or{" "}
                  <BSInlineFunction functionName={"ApplyGameplayEffectSpecToSelf"} /> on the <p className="inline text-light">ASC</p>. I
                  believe this depends on the <p className="inline text-light">GE&#39;s</p>{" "}
                  <p className="inline text-light">Duration Type</p>.
                </p>
                <div className="article-subsection-2" ref={Ref_24} id="timeline-ApplyingTheGE">
                  <BlogHeading headingText="Applying The GE" headingLevel={3} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      There&#39;s actually three <BSInlineFunction functionName={"ApplyGameplayEffectSpecToTarget"} /> functions that are
                      called since we&#39;re starting from a <p className="inline text-light">GA</p>. It starts with the one owned by the{" "}
                      <p className="inline text-light">GA</p> and then calls the{" "}
                      <BSInlineFunction className={"FGameplayAbilityTargetData"} /> version, which duplicates the{" "}
                      <p className="inline text-light">GESpec</p> and context. Then it calls the <p className="inline text-light">ASC</p>{" "}
                      version for each targeted actor, but there will only be one in this example.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction functionName={"ApplyGameplayEffectSpecToSelf"} /> is called on the target{" "}
                      <p className="inline text-light">ASC</p>. In this example, it’s the <BSInlineFunction className={"ATarget"} />
                      ’s <p className="inline text-light">ASC</p>.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      This is where application immunity is checked and the chance to apply the effect is calculated (always 100% in this
                      example). Application Tag Requirements, Removal Tag Requirements, and Custom Application Requirements are also checked
                      (none here).
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      From what I’ve gathered,{" "}
                      <BSInlineFunction className={"FActiveGameplayEffectsContainer"} functionName={"ApplyGameplayEffectSpec"} /> is called
                      when the <p className="inline text-light">GE&#39;s</p> <p className="inline text-light">Duration Type</p> is infinite.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className={"UBSAbilitySystemComponent"} functionName={"ExecuteGameplayEffect"} /> is called when the{" "}
                      <p className="inline text-light">GE&#39;s</p> <p className="inline text-light">Duration Type</p> is instant, OR the{" "}
                      <p className="inline text-light">GE</p> is applying a periodic effect.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Duration and Infinite <p className="inline text-light">GEs</p> have the option of applying periodic effects, which are
                      treated like Instant <p className="inline text-light">GEs</p> that occur at fixed intervals.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Since this is an instant <p className="inline text-light">GE</p>,{" "}
                      <BSInlineFunction functionName={"ExecuteGameplayEffect"} /> is called inside the{" "}
                      <BSInlineFunction functionName={"ApplyGameplayEffectSpecToSelf"} /> function. This basically just calls{" "}
                      <BSInlineFunction functionName={"ExecuteActiveEffectsFrom"} /> on the{" "}
                      <BSInlineFunction className={"FActiveGameplayEffectsContainer"} /> within the <p className="inline text-light">ASC</p>
                      .
                    </li>
                  </ul>
                </div>
                <div className="article-subsection-2" ref={Ref_25} id="timeline-ExecutingTheGE">
                  <BlogHeading headingText="Executing the GE" headingLevel={3} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction functionName={"ExecuteActiveEffectsFrom"} /> is the main function that executes a{" "}
                      <p className="inline text-light">GE</p> on attributes and <p className="inline text-light">Active GEs</p>.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Any <p className="inline text-light">Modifiers</p> and <p className="inline text-light">Executions</p> on the{" "}
                      <p className="inline text-light">GE</p> are executed.
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          As previously mentioned, BeatShot uses two types of damage: Hit and Tracking. These attributes are snapshotted
                          from the source (damage causer) during initialization of the of <p className="inline text-light">GESpec</p>.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          <BSInlineFunction className={"UBSDamageExecCalc"} functionName={"Execute_Implementation"} /> is where the
                          calculation takes place.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          The calculation first accesses the source and target <p className="inline text-light">Gameplay Tags</p>. This
                          tells the calculation which kinds of immunity, if any, the target has. If the target is Immune to Hit Damage, the
                          Hit Damage Attribute that was captured from the source is not used in the damage calculation. Similarly, if the
                          target is immune to Tracking Damage, the Tracking Damage Attribute is not used.
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                          Instead of using a Gameplay Effect Execution like the Figure below, I could have used a Gameplay Effect Modifier.
                          You can also use both.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      If an <p className="inline text-light">Execution</p> wants conditional effects to trigger, those are applied. (None
                      for this example).
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      After returning from the <BSInlineFunction functionName={"ExecuteGameplayEffect"} /> function, we pick back up in the{" "}
                      <BSInlineFunction functionName={"ApplyGameplayEffectSpecToSelf"} /> function.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Any effects that should be removed on application of this <p className="inline text-light">GE</p> are removed.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      The source <BSInlineFunction className={"OnGameplayEffectAppliedToSelf"} /> and the target{" "}
                      <BSInlineFunction className={"OnGameplayEffectAppliedToTarget"} /> delegates are broadcast.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="article-subsection" ref={Ref_19} id="timeline-GameplayCues">
                <BlogHeading headingText="Gameplay Cues" headingLevel={2} />
                <p>
                  <p className="inline text-light">Gameplay Cues</p> allow non-gameplay related tasks to execute like effects, decals, etc.
                  You can trigger them through <p className="inline text-light">GEs</p> or directly like I did in Blueprint Graph 1. I chose
                  not to use a <p className="inline text-light">GE</p> because I always want{" "}
                  <p className="inline text-light">GameplayCue.FireGun</p> to trigger any time the ability is activated regardless of the{" "}
                  <p className="inline text-light">GE</p> application success.
                </p>
                <p>
                  I chose to use a <BSInlineFunction className="UGameplayCueNotify_Burst" /> since its meant to be used for one-off events.{" "}
                  <BSInlineFunction className="AGameplayCueNotify_Actor" /> is another version that is actually spawned in the world, but
                  that is not used in this example.
                </p>
                <div className="article-subsection-2" ref={Ref_20} id="timeline-GCNWeaponFire">
                  <BlogHeading headingText="GCN_WeaponFire and BP_WeaponFire" headingLevel={3} />
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className="GCN_WeaponFire" /> is the <BSInlineFunction className="UGameplayCueNotify_Burst" />{" "}
                      blueprint class that handles the <p className="inline text-light">GameplayCue.FireGun</p> response. First, the C++
                      function <BSInlineFunction functionName="Fire" /> is called on the character’s weapon to increment the total shots
                      fired by the player.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Next, recoil is applied to the character if the gun has a <p className="inline text-light">Gameplay Tag</p> that
                      denotes if recoil should be used.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      Finally, the blueprint function <BSInlineFunction functionName="Fire_BP" /> is called on the weapon, and the Impact
                      Position and Impact Normal from the HitResult are passed as parameters. This function is responsible for spawning the{" "}
                      <BSInlineFunction className="WeaponFire" /> blueprint class, as well as updating a few variables inside that instruct
                      whether or not and where to spawn the various effects.
                    </li>
                    <BlueprintGraph
                      bpLink="https://blueprintue.com/render/pqprz-_7/"
                      label="Blueprint Graph 2"
                      description={<BSInlineFunction className="GameplayCueNotify_Burst" functionName={"OnBurst"} />}
                    />
                    <li>
                      <FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
                      <BSInlineFunction className="WeaponFire" /> manages the bullet tracers, muzzle flash, and decals. A separate actor is
                      used so that if the character swaps to the knife, the effects are still managed without relying on the weapon. There
                      isn’t much too much going on here besides calling <BSInlineFunction functionName="SpawnSystemAttached" /> and{" "}
                      <BSInlineFunction functionName="SpawnDecal" />.
                    </li>
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
