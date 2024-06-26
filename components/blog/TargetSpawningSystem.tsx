"use client";

import React, { useRef } from "react";
import useOnScreen from "@/hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "@/components/SidebarHashLink";
import { BSCodeBlock, BSInlineCodeBlock, BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { BlogHeading, BlogHeadingClass } from "@/components/blog/BlogHeading";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import image_BoxBounds from "@/public/BoxBounds.png";
import image_Hero from "@/public/SpawnMemory_Hero_Cropped.png";
import image_OverlappingVerts from "@/public/OverlappingVerts.png";
import image_SpawnMemory_Dynamic_FewRecent from "@/public/SpawnMemory_Dynamic_FewRecent.png";
import image_SpawnMemory_Dynamic_ManyRecent from "@/public/SpawnMemory_Dynamic_ManyRecent.png";
import "@/styles/article.scss";
import "@/styles/hero.scss";
const OnAudioAnalyzerBeat = `void ATargetManager::OnAudioAnalyzerBeat()
{
    if (!ShouldSpawn) return;

    if (!CurrentSpawnArea)
    {
        FindNextTargetProperties();
        return;
    }

    HandleActivateExistingTargets();

    if (BSConfig.TargetConfig.TargetSpawningPolicy == ETargetSpawningPolicy::RuntimeOnly)
    {
        HandleRuntimeSpawnAndActivation();
    }

    if (BSConfig.TargetConfig.RecentTargetMemoryPolicy == ERecentTargetMemoryPolicy::NumTargetsBased)
    {
        SpawnAreaManager->RefreshRecentFlags();
    }
}`;

const ActivateTarget = `bool ATargetManager::ActivateTarget(ATarget* InTarget) const
{
    const FGuid Guid = SpawnAreaManager->FindSpawnAreaFromGuid(InTarget->GetGuid());
    if (!InTarget || !SpawnAreaManager->IsSpawnAreaValid(Guid))
    {
        return false;
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::AddImmunity))
    {
        InTarget->ApplyImmunityEffect();
    }
    else if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::RemoveImmunity))
    {
        InTarget->RemoveImmunityEffect();
    }
    else if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ToggleImmunity))
    {
        InTarget->IsTargetImmune() ? InTarget->RemoveImmunityEffect() : InTarget->ApplyImmunityEffect();
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeVelocity))
    {
        const float NewSpeed = FMath::FRandRange(BSConfig.TargetConfig.MinTargetSpeed, BSConfig.TargetConfig.MaxTargetSpeed)
        InTarget->SetTargetSpeed(NewSpeed);
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeDirection))
    {
        const FVector NewDirection = UKismetMathLibrary::GetDirectionUnitVector(InTarget->GetActorLocation(),
            GetRandomMovingTargetEndLocation(InTarget->GetActorLocation(), InTarget->GetTargetSpeed(), 
            InTarget->GetLastDirectionChangeHorizontal()));
        InTarget->SetTargetDirection(NewDirection);
        InTarget->SetLastDirectionChangeHorizontal(!InTarget->GetLastDirectionChangeHorizontal());
    }

    if (BSConfig.TargetConfig.TargetActivationResponses.Contains(ETargetActivationResponse::ChangeScale))
    {
        InTarget->SetSphereScale(GetNextTargetScale());
    }

    if (InTarget->ActivateTarget(BSConfig.TargetConfig.TargetMaxLifeSpan))
    {
        SpawnAreaManager->FlagSpawnAreaAsActivated(InTarget->GetGuid());
        OnTargetActivated.Broadcast();
        if (ReinforcementLearningComponent->IsActive() && SpawnAreaManager->IsSpawnAreaValid(PreviousSpawnArea))
        {
            ReinforcementLearningComponent->AddToActiveTargetPairs(PreviousSpawnArea->GetIndex(), CurrentSpawnArea->GetIndex());
        }

        return true;
    }

    return false;
}`;

const FindNextTargetProperties = `void ATargetManager::FindNextTargetProperties()
{
    const FVector NewScale = GetNextTargetScale();

    if (CurrentSpawnArea)
    {
        LastTargetSpawnedCenter = CurrentSpawnArea->GetChosenPoint().Equals(GetBoxOrigin());
       	// Assign CurrentSpawnArea address to PreviousSpawnArea just before finding CurrentSpawnArea
        PreviousSpawnArea = CurrentSpawnArea;
    }
    else
    {
        LastTargetSpawnedCenter = false;
        PreviousSpawnArea = nullptr;
    }

    CurrentSpawnArea = GetNextSpawnArea(BSConfig.TargetConfig.BoundsScalingPolicy, NewScale);
    if (CurrentSpawnArea && SpawnAreaManager->GetSpawnAreas().IsValidIndex(CurrentSpawnArea->GetIndex()))
    {
        CurrentSpawnArea->SetTargetScale(NewScale);
    }
}`;

const EGridIndexType = `UENUM(BlueprintType)
enum class EGridIndexType: uint8
{
    None UMETA(DisplayName = "None"),
        Corner_TopLeft UMETA(DisplayName = "Corner_TopLeft"),
        Corner_TopRight UMETA(DisplayName = "Corner_TopRight"),
        Corner_BottomRight UMETA(DisplayName = "Corner_BottomRight"),
        Corner_BottomLeft UMETA(DisplayName = "Corner_BottomLeft"),
        Border_Top UMETA(DisplayName = "Border_Top"),
        Border_Right UMETA(DisplayName = "Border_Right"),
        Border_Bottom UMETA(DisplayName = "Border_Bottom"),
        Border_Left UMETA(DisplayName = "Border_Left"),
        Middle UMETA(DisplayName = "Middle"),
};
`;

const GetValidSpawnLocations = `TArray<FVector> USpawnAreaManagerComponent::GetValidSpawnLocations(const FVector& Scale, 
    const FExtrema& InCurrentExtrema, const USpawnArea* CurrentSpawnArea) const
{
    TArray<FVector> ValidSpawnLocations;
    switch (BSConfig.TargetConfig.TargetDistributionPolicy)
    {
        case ETargetDistributionPolicy::EdgeOnly:
            HandleEdgeOnlySpawnLocations(ValidSpawnLocations, InCurrentExtrema);
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            break;
        case ETargetDistributionPolicy::FullRange:
            HandleFullRangeSpawnLocations(ValidSpawnLocations, InCurrentExtrema);
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            break;
        case ETargetDistributionPolicy::Grid:
            HandleGridSpawnLocations(ValidSpawnLocations, CurrentSpawnArea);
            break;
        case ETargetDistributionPolicy::None:
        case ETargetDistributionPolicy::HeadshotHeightOnly:
            ValidSpawnLocations = GetAllBottomLeftVertices();
            RemoveOverlappingSpawnLocations(ValidSpawnLocations, Scale);
            break;
    }

    return ValidSpawnLocations;
}`;

const SpawnTarget = `ATarget* ATargetManager::SpawnTarget(USpawnArea* InSpawnArea)
{
    if (!InSpawnArea)
    {
        return nullptr;
    }

    ATarget* Target = GetWorld()->SpawnActorDeferred<ATarget> (TargetToSpawn,
        FTransform(FRotator::ZeroRotator, InSpawnArea->GetChosenPoint(), InSpawnArea->GetTargetScale()),
        this, nullptr, ESpawnActorCollisionHandlingMethod::AlwaysSpawn);
    Target->InitTarget(BSConfig.TargetConfig);
    Target->FinishSpawning(FTransform(), true);
    Target->OnTargetDamageEventOrTimeout.AddDynamic(this, &ATargetManager::OnTargetHealthChangedOrExpired);
    InSpawnArea->SetTargetGuid(Target->GetGuid());
    AddToManagedTargets(Target, InSpawnArea);
    return Target;
}`;

const RemovingOverlappingSpawnLocations = `void USpawnAreaManagerComponent::RemoveOverlappingSpawnLocations(TArray<FVector>& SpawnLocations, const FVector& Scale) const
{
    TArray<FVector> OverlappingVertices;
    for (const USpawnArea* SpawnArea: GetActivatedOrRecentSpawnAreas())
    {
       	// Regenerate Overlapping vertices if necessary
        if (Scale.Length() > SpawnArea->GetTargetScale().Length())
        {
            TArray<FVector> TempOverlappingVertices = SpawnArea->GenerateOverlappingVertices(
                BSConfig.TargetConfig.MinDistanceBetweenTargets, MinOverlapRadius, SpawnArea->GetTargetScale());
            for (const FVector& Vector: TempOverlappingVertices)
            {
              OverlappingVertices.AddUnique(Vector);
            }
        }
        else
        {
            for (const FVector& Vector: SpawnArea->GetOverlappingVertices())
            {
                OverlappingVertices.AddUnique(Vector);
            }
        }
    }

    SpawnLocations = SpawnLocations.FilterByPredicate([&OverlappingVertices] (const FVector& Location)
    {
        return OverlappingVertices.Contains(Location) ? false : true;
    });
}`;

const HandleDeactivation = `void ATarget::HandleDeactivationResponses(const bool bExpired)
{
    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::RemoveImmunity))
    {
        RemoveImmunityEffect();
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::AddImmunity))
    {
        ApplyImmunityEffect();
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ToggleImmunity))
    {
        IsTargetImmune() ? RemoveImmunityEffect() : ApplyImmunityEffect();
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetScale))
    {
        SetSphereScale(InitialTargetScale);
    }
    else if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ApplyDeactivatedTargetScaleMultiplier))
    {
        SetSphereScale(GetCurrentTargetScale() * Config.ConsecutiveChargeScaleMultiplier);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetPosition))
    {
        SetActorLocation(InitialTargetLocation);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ShrinkQuickGrowSlow) && !bExpired)
    {
        PlayShrinkQuickAndGrowSlowTimeline();
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::PlayExplosionEffect) && !bExpired)
    {
        PlayExplosionEffect(SphereMesh->GetComponentLocation(), SphereTargetRadius * GetCurrentTargetScale().X, ColorWhenDestroyed);
    }

    if (Config.TargetDeactivationResponses.Contains(ETargetDeactivationResponse::ResetColorToInactiveColor))
    {
        SetSphereColor(Config.InactiveTargetColor);
    }
}`;

const TargetSpawningSystem = () => {
	const articlePath = "/devblog/target-spawning-system";

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
	const onScreen_TargetLifeCycle = useOnScreen(Ref_TargetLifeCycle);
	const onScreen_Initialization = useOnScreen(Ref_Initialization);
	const onScreen_Spawning = useOnScreen(Ref_Spawning);
	const onScreen_Activation = useOnScreen(Ref_Activation);
	const onScreen_Deactivation = useOnScreen(Ref_Deactivation);
	const onScreen_Destruction = useOnScreen(Ref_Destruction);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

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
					<Sidebar>
						<ul>
							<li>
								<SidebarHashLink
									hash={`#classes-header`}
									text="Classes"
									onScreen={onScreen_Classes}
									topLevelLink={true}
									href={""}
								/>
								<ul>
									<li>
										<SidebarHashLink
											hash={`#classes-USpawnArea`}
											text="Spawn Area"
											onScreen={onScreen_Classes && onScreen_USpawnArea}
											href={""}
										/>
									</li>
									<li>
										<SidebarHashLink
											hash={`#classes-ATargetManager`}
											text="Target Manager"
											onScreen={
												onScreen_Classes && !onScreen_USpawnArea && onScreen_ATargetManager
											}
											href={""}
										/>
										<ul>
											<li>
												<SidebarHashLink
													hash={`#classes-UBoxComponent`}
													text="Box Components"
													onScreen={
														onScreen_Classes &&
														!onScreen_USpawnArea &&
														onScreen_ATargetManager &&
														onScreen_UBoxComponent
													}
													href={""}
												/>
											</li>
											<li>
												<SidebarHashLink
													hash={`#classes-UReinforcementLearningComponent`}
													text="Reinforcement Learning Component"
													onScreen={
														onScreen_Classes &&
														!onScreen_USpawnArea &&
														onScreen_ATargetManager &&
														!onScreen_UBoxComponent &&
														onScreen_UReinforcementLearningComponent
													}
													href={""}
												/>
											</li>
											<li>
												<SidebarHashLink
													hash={`#classes-USpawnAreaManagerComponent`}
													text="Spawn Area Manager Component"
													onScreen={
														onScreen_Classes &&
														!onScreen_USpawnArea &&
														onScreen_ATargetManager &&
														!onScreen_UReinforcementLearningComponent &&
														onScreen_USpawnAreaManagerComponent
													}
													href={""}
												/>
											</li>
										</ul>
									</li>
									<li>
										<SidebarHashLink
											hash={`#classes-ATarget`}
											text="Target"
											onScreen={onScreen_Classes && !onScreen_ATargetManager && onScreen_ATarget}
											href={""}
										/>
										<ul>
											<li>
												<SidebarHashLink
													hash={`#classes-UProjectileMovementComponent`}
													text="Projectile Movement Component"
													onScreen={
														onScreen_Classes &&
														!onScreen_ATargetManager &&
														onScreen_ATarget &&
														onScreen_UProjectileMovementComponent
													}
													href={""}
												/>
											</li>
											<li>
												<SidebarHashLink
													hash={`#classes-UBSAbilitySystemComponent`}
													text="Ability System Component"
													onScreen={
														onScreen_Classes &&
														!onScreen_ATargetManager &&
														onScreen_ATarget &&
														!onScreen_UProjectileMovementComponent &&
														onScreen_UBSAbilitySystemComponent
													}
													href={""}
												/>
											</li>
											<li>
												<SidebarHashLink
													hash={`#classes-UBSHealthComponent`}
													text="Health Component"
													onScreen={
														onScreen_Classes &&
														!onScreen_ATargetManager &&
														onScreen_ATarget &&
														!onScreen_UBSAbilitySystemComponent &&
														onScreen_UBSHealthComponent
													}
													href={""}
												/>
											</li>
										</ul>
									</li>
									<li>
										<SidebarHashLink
											hash={`#classes-ABSGameMode`}
											text="BSGameMode"
											onScreen={onScreen_Classes && !onScreen_ATarget && onScreen_ABSGameMode}
											href={""}
										/>
									</li>
								</ul>
							</li>
							<li>
								<SidebarHashLink
									hash={`#target-lifecycle`}
									text="Target Lifecycle"
									onScreen={!onScreen_Classes && onScreen_TargetLifeCycle}
									topLevelLink={true}
									href={""}
								/>
								<ul>
									<li>
										<SidebarHashLink
											hash={`#target-lifecycle-Initialization`}
											text="Initialization"
											onScreen={
												!onScreen_Classes && onScreen_TargetLifeCycle && onScreen_Initialization
											}
											href={""}
										/>
									</li>
									<li>
										<SidebarHashLink
											hash={`#target-lifecycle-Spawning`}
											text="Spawning"
											onScreen={
												!onScreen_Classes &&
												onScreen_TargetLifeCycle &&
												!onScreen_Initialization &&
												onScreen_Spawning
											}
											href={""}
										/>
									</li>
									<li>
										<SidebarHashLink
											hash={`#target-lifecycle-Activation`}
											text="Activation"
											onScreen={
												!onScreen_Classes &&
												onScreen_TargetLifeCycle &&
												!onScreen_Initialization &&
												!onScreen_Spawning &&
												onScreen_Activation
											}
											href={""}
										/>
									</li>
									<li>
										<SidebarHashLink
											hash={`#target-lifecycle-Deactivation`}
											text="Deactivation"
											onScreen={
												!onScreen_Classes &&
												onScreen_TargetLifeCycle &&
												!onScreen_Initialization &&
												!onScreen_Spawning &&
												!onScreen_Activation &&
												onScreen_Deactivation
											}
											href={""}
										/>
									</li>
									<li>
										<SidebarHashLink
											hash={`#target-lifecycle-Destruction`}
											text="Destruction"
											onScreen={
												!onScreen_Classes &&
												onScreen_TargetLifeCycle &&
												!onScreen_Initialization &&
												!onScreen_Spawning &&
												!onScreen_Activation &&
												!onScreen_Deactivation &&
												onScreen_Destruction
											}
											href={""}
										/>
									</li>
								</ul>
							</li>
							<li>
								<SidebarHashLink
									href={articlePath.concat(`#conclusion`)}
									hash={`#conclusion`}
									text="Conclusion"
									passHref={true}
									onScreen={!onScreen_TargetLifeCycle && onScreen_Conclusion}
									topLevelLink={true}
								/>
							</li>
						</ul>
					</Sidebar>
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
									Target spawn locations are chosen from a 2-D rectangle that I&#39;ll be referring to
									as the <em>total spawn area</em>. The total spawn area dimensions are the Horizontal
									and Vertical Spread from custom game mode options. These dimensions correspond to
									the actual size in Unreal units, and when maxed out represent 3.2 million individual
									points.
								</p>
								<p>
									I needed to find a way to keep track of target locations and the total area that
									they occupied. Iterating through 3.2 million points isn&#39;t even an option, so the
									total two-dimensional spawn rectangle is broken into the smaller rectangles, where
									each one is represented by a SpawnArea.
								</p>
								<ul>
									Each SpawnArea contains:
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										info about the area it represents
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										info about the targets that have spawned within it, such as the scale the target
										spawned with and its global unique identifier
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										flags that indicate if a target in its area is activated, deactivated, or if its
										only holding the location (target is no longer visible, but still not allowed to
										spawn there)
									</li>
								</ul>
							</div>
							<div className="article-subsection" ref={Ref_ATargetManager} id="classes-ATargetManager">
								<BlogHeadingClass
									baseClass="AActor"
									childClass="ATargetManager"
									headingLevel={2}
									childClassLink="https://github.com/markoleptic/BeatShot/blob/c4d05de0786f2db218338d4910e6f32816584d32/BeatShot/Private/Target/TargetManager.cpp"
								/>
								<p>
									The Target Manager spawns and holds references to targets. It is responsible for
									target activation and handles all <em>Target Activation Responses</em>, which are
									used to describe what a target does when it is activated. Some examples include
									removing immunity and changing the direction of a moving target. This actor relies
									on several important components that distribe its functionality.
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
										The first plane (middle red in Figure 1) corresponds to the total spawn area, or
										the 2-D area encompassed by all SpawnArea objects.
									</p>
									<p>
										The other six form a rectangular prism (blue, green, front & back red planes in
										Figure 1) used to confine moving targets. I would&#39;ve preferred to only use
										one box component, but &#34;hollow collision&#34; is not a thing. They form a
										closed volume, but are offset in Figure 1 for visiblity.
									</p>
									<figure>
										<div className="figure-border-container">
											<Image src={image_BoxBounds} alt="BoxBounds" />
											<figcaption>
												<p className="figlabel">Figure 1: </p>
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
										The SpawnArea Manager Component creates and manages all the SpawnArea objects.
									</p>
									<p>
										It calculates the size that all SpawnAreas are set to, with the main limiting
										factor being that RL Component is always a 5x5 grid. This means that the number
										of horizontal and vertical SpawnAreas must also be in multiples of five, though
										they don&#39;t need to be the same multiple of five.
									</p>
									<p>
										This component used to be part of the base Target Manager class, but as the
										class grew in size, it made sense to encapsulate all SpawnArea-related functions
										into a component.
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
									While the Target Manager is responsible for target activation, the target itself is
									responsible for deactivation and handling <em>Target Deactivation Responses</em>,
									which are used to describe what a target does when it is deactivated. Some examples
									include applying immunity and playing effects. To trigger a Target Deactivation
									Response, a <em>Target Deactivation Condition</em> must be met. In addition to
									deactivation, the target is also responsible for its own destruction, which is
									triggered by a <em>Target Destruction Condition</em>. Deactivation and Destruction
									are discussed more in their respective sections.
								</p>
								<p>
									The target relays information to the Target Manager any time it takes damage or
									times out due to its <em>Max Lifespan</em> expiring. The class has several important
									components that help game modes run smoothly.
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
										Manager calls{" "}
										<BSInlineFunction className={"ATarget"} functionName={"SetTargetSpeed"} /> and{" "}
										<BSInlineFunction className={"ATarget"} functionName={"SetTargetDirection"} />{" "}
										when it wants to change the velocity or direction. These also happen to be
										Target Activation Responses.
									</p>
									<p>
										In order to retain the same velocity that a target had prior to bouncing into
										something,{" "}
										<BSInlineFunction
											className={"UProjectileMovementComponent"}
											functionName={"OnProjectileBounce"}
										/>{" "}
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
										The ASC enables us to apply immunity to the target for the different damage
										types (and control them independently) and has built in support for tracking
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
										<BSInlineFunction className={"ATarget"} functionName={"OnHealthChanged"} />{" "}
										function. If you aren&#39;t familiar with delegates, this just means that when
										the target health changes, the function will be called.
									</p>
									<p>
										In this case, the OnHealthChanged delegate has three parameters that will be
										passed to the function:
									</p>
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The actor who insigated the damage
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
										damage event. This is important becuase the target damages itself if its Max
										Lifespan expires.
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
									<BSInlineFunction className={"ATargetManager"} functionName={"Init"} />. More
									specifically, it does the following:
								</p>
								<ol>
									<li>Sets the dimensions of all box components</li>
									<li>
										Calls{" "}
										<BSInlineFunction
											className={"USpawnAreaManagerComponent"}
											functionName={"Init"}
										/>
									</li>
									<li>
										Calls{" "}
										<BSInlineFunction
											className={"UReinforcementLearningComponent"}
											functionName={"Init"}
										/>
									</li>
								</ol>
								<p>
									After receiving the game mode config from the Target Manager,{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"InitializeSpawnAreas"}
									/>{" "}
									is called to generate all SpawnAreas for the game mode. This is where the SpawnArea
									Manager Component determines how many SpawnAreas the total spawn area needs to be
									divided into. This happens inside{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"SetSpawnMemoryValues"}
									/>
									. Once the width and height of the SpawnAreas are found, the SpawnArea Manager
									Component creates a new USpawnArea object for each section of the total spawn area.
									It then calls <BSInlineFunction className={"USpawnArea"} functionName={"Init"} />,
									which sets up basic information about the SpawnArea. Notably, it also specifies
									which type of section inside the total spawn area it belongs to, represented by
									EGridIndexType:
								</p>
								<BSCodeBlock code={EGridIndexType} fontSize="0.65rem" />
								<p>
									The SpawnArea then finds all adjacent SpawnAreas based on the Grid Index Type and
									the number of horizontal SpawnAreas that make up the total spawn area. The Grid
									Index Type allows the Grid <em>Target Distribution Policy</em> to quickly access all
									adjacent SpawnAreas, which is how BeatGrid finds targets to activate.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Spawning} id="target-lifecycle-Spawning">
								<BlogHeading headingText="Spawning" headingLevel={2} />
								<p>
									There are two spawning methods in BeatShot:{" "}
									<BSInlineEnum className={"ETargetSpawningPolicy"} valueName={"UpfrontOnly"} /> and{" "}
									<BSInlineEnum className={"ETargetSpawningPolicy"} valueName={"RuntimeOnly"} />.
								</p>
								<p>
									Game modes using{" "}
									<BSInlineEnum className={"ETargetSpawningPolicy"} valueName={"UpfrontOnly"} /> spawn
									all targets inside{" "}
									<BSInlineFunction className={"ATargetManager"} functionName={"Init"} />. No other
									targets are spawned for the duration of the game mode.
								</p>
								<p>
									Game modes using{" "}
									<BSInlineEnum className={"ETargetSpawningPolicy"} valueName={"RuntimeOnly"} /> spawn
									their targets based on beat thresholds being met by the audio analyzer, which
									triggers the game mode to call{" "}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"OnAudioAnalyzerBeat"}
									/>
									. I discuss this function more in the Activation section, but for now I want to
									focus on what happens when any target is spawned, regardless of the Target Spawning
									Policy.
								</p>
								<BSCodeBlock code={SpawnTarget} fontSize="0.65rem" />
								<p>
									The location and scale of the target are retrieved from a previously found
									SpawnArea. I use SpawnActorDeferred so the game mode config can be passed to the
									target before it&#39;s finished spawning.
								</p>
								<p>
									<BSInlineFunction className={"ATarget"} functionName={"Init"} /> sets the Max Health
									attribute of the target and provides all the information the target needs about the
									game mode. The Target Manager binds to the target&#39;s OnTargetDamageEventOrTimeout
									delegate, which is broadcast when the health of the target is changed. This delegate
									is discussed more in the Deactivation section.
								</p>
								<p>
									The SpawnArea is assigned the target&#39;s global unique identifier, the target is
									added to the Target Manager&#39;s array of managed targets, and{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"FlagSpawnAreaAsManaged"}
									/>{" "}
									is called. This lets the Spawn Area Manager know that the SpawnArea now represents a
									target.
								</p>
								<p>
									When a SpawnArea is flagged as <em>Managed</em>,{" "}
									<BSInlineFunction
										className={"USpawnArea"}
										functionName={"GenerateOverlappingVertices"}
									/>{" "}
									is called. This function finds all surrounding SpawnAreas that would cause an
									overlap if a target with the same radius is spawned inside that SpawnArea. This is
									done by tracing a sphere centered at the location the target was spawned inside the
									SpawnArea. These traced spheres are shown in Figure 2 as purple wireframes, while
									the red and green points are the center of individual SpawnAreas.
								</p>
								<figure>
									<div className="figure-border-container">
										<Image src={image_OverlappingVerts} alt="OverlappingVerts" />
										<figcaption>
											<p className="figlabel">Figure 2: </p>
											Overlapping Vertices generated after each target was flagged as Managed.
										</figcaption>
									</div>
								</figure>
								<p>
									The green points mean that it&#39;s currently safe to spawn a target in that
									SpawnArea, while the red points mean it&#39;s not. Each time a new target occupies a
									given SpawnArea, these vertices generated and stored. They are then used when
									finding subsequent target spawn locations, which is discussed in the Activation
									section.
								</p>
								<p>
									The radius of the traced sphere should be big enough that it captures all SpawnAreas
									that would cause an overlap, but small enough that it doesn&#39;t restrict the
									possible spawn locations to an unnecessary small amount. Since a target can spawn
									anywhere inside a SpawnArea, some amount of error is introduced.
								</p>
								<p>
									I ended up setting the traced sphere radius is equal to twice the radius of the
									target that was spawned in the spawn area plus the larger of the width and height of
									the SpawnArea. This seemed to give me the best results when testing many targets at
									once with varying scales, without restricting the number of spawn locations too
									much.
								</p>
							</div>
							<div className="article-subsection" ref={Ref_Activation} id="target-lifecycle-Activation">
								<BlogHeading headingText="Activation" headingLevel={2} />
								<p>
									The chain of events leading to target activation begins when the game mode recieves
									input from the audio analyzer that the beat threshold has been met, and calls{" "}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"OnAudioAnalyzerBeat"}
									/>
									. If using a song from a file, this would occur exactly Spawn Beat Delay seconds
									before you actually hear the beat.
								</p>
								<BSCodeBlock code={OnAudioAnalyzerBeat} fontSize="0.65rem" />
								<p>
									The TargetManager looks for any existing target(s) that can be activated, and tries
									to activate them according to the game mode config using{" "}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"HandleActivateExistingTargets"}
									/>
									.
								</p>
								<p>
									If the game mode config allows for targets to be spawned at runtime (
									<BSInlineEnum className={"ETargetSpawningPolicy"} valueName={"RuntimeOnly"} />
									),{" "}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"HandleRuntimeSpawnAndActivation"}
									/>{" "}
									is called.
								</p>
								{/* <BSCodeBlock code={HandleRuntimeSpawnAndActivation} fontSize="0.65rem" /> */}
								<p>
									In both of these functions, the general procedure is to activate the target{" ("}
									<BSInlineFunction className={"ATargetManager"} functionName={"ActivateTarget"} />
									{")"} and then find the scale and SpawnArea for the next target if it was
									successfully activated
									{" ("}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"FindNextTargetProperties"}
									/>
									{")"}.
								</p>
								<BSCodeBlock code={ActivateTarget} fontSize="0.65rem" />
								<p>
									The only two SpawnArea objects that the Target Manager keeps track of are the
									PreviousSpawnArea and the CurrentSpawnArea. The only place these two variables are
									changed is inside{" "}
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"FindNextTargetProperties"}
									/>
									, and this function is always called immediately after activating a target.
								</p>
								<BSCodeBlock code={FindNextTargetProperties} fontSize="0.65rem" />
								<p>
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"GetNextTargetScale"}
									/>{" "}
									returns either a random target scale between the Min and Max Target Scale or a
									dynamic target scale taken from a curve based on the number of recent targets
									successfully destroyed.
								</p>
								<p>
									The SpawnArea containing the next target location is found using{" "}
									<BSInlineFunction className={"ATargetManager"} functionName={"GetNextSpawnArea"} />,
									which goes through several checks to see if it can spawn at the origin or get a
									SpawnArea from the RL Component, but the main thing I want to focus on is when it
									calls{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"GetValidSpawnLocations"}
									/>
									. This function is the heart of spawn location decision making.
								</p>
								<BSCodeBlock code={GetValidSpawnLocations} fontSize="0.65rem" />
								<p>
									The game mode config&#39;s Target Distribution Policy dictates which series of
									functions are executed. Most distribution policies begin considering all SpawnAreas
									as valid choices, rather than only finding SpawnAreas that aren&#39;t currently
									activated or recent. This is because a smaller target may spawn before a larger
									target, and the cutout size of the sphere it left will not be big enough to safely
									spawn the next larger target without overlapping the smaller one. This is also why
									the target scale is found before finding the SpawnArea.
								</p>
								<p>
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"HandleFullRangeSpawnLocations"}
									/>{" "}
									removes all SpawnAreas that fall outside of the current total spawn area. This only
									applies to game modes using{" "}
									<BSInlineEnum className={"EBoundsScalingPolicy"} valueName={"Dynamic"} /> since the
									total spawn area is always the same for game modes using{" "}
									<BSInlineEnum className={"EBoundsScalingPolicy"} valueName={"Static"} />. Referring
									to Figure 3, the red boxes outside the the current spawn area (blue box) are the
									SpawnAreas this function removed from consideration for a game mode using{" "}
									<BSInlineEnum className={"EBoundsScalingPolicy"} valueName={"Dynamic"} />.
								</p>
								<p>
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"HandleEdgeOnlySpawnLocations"}
									/>{" "}
									only adds the points along the border of the current total spawn area.
								</p>
								<figure>
									<div className="figure-border-container">
										<Image
											src={image_SpawnMemory_Dynamic_FewRecent}
											alt="SpawnMemory_Dynamic_FewRecent"
										/>
										<figcaption>
											<p className="figlabel">Figure 3: </p>
											All Spawn Areas for a game mode using{" "}
											<BSInlineEnum className={"EBoundsScalingPolicy"} valueName={"Dynamic"} />,
											where green boxes represent valid and red boxes represent invalid. The blue
											box represents the current total spawn area.
										</figcaption>
									</div>
								</figure>
								<p>
									All Target Distribution Policies besides Grid call{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"RemoveOverlappingSpawnLocations"}
									/>
									. This function loops over all SpawnAreas that are flagged as <em>Activated</em> or{" "}
									<em>Recent</em> and adds their overlapping vertices to a temporary array that is
									used to filter the spawn locations passed by reference to the function.
								</p>
								<BSCodeBlock code={RemovingOverlappingSpawnLocations} fontSize="0.65rem" />
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
									itself using a <BSInlineCodeBlock code={"UGameplayEffect"} padding={"0"} /> that
									applies damage equal to the Expiration Health Penalty.
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
									<BSInlineFunction
										className={"ATargetManager"}
										functionName={"OnTargetHealthChangedOrExpired"}
									/>{" "}
									is the function that all targets broadcast the delegate to.
								</p>
								<p>
									First, the Target Manager updates the consecutive targets hit and adjusts the
									dynamic scale factor. This value controls the target scale if using{" "}
									<BSInlineEnum
										className={"EConsecutiveTargetScalePolicy"}
										valueName={"SkillBased"}
									/>{" "}
									and the total spawn area if using{" "}
									<BSInlineEnum className={"EBoundsScalingPolicy"} valueName={"Dynamic"} />. The
									struct is then forwarded to the game mode which updates the score and player HUD.
									The target is removed from the Target Manager&#39;s managed target array if the
									Target Destruction Conditions permit. Any time a target is removed from this array,{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"RemoveManagedFlagFromSpawnArea"}
									/>{" "}
									is also called.
								</p>
								<p>
									Next, if the game mode uses the RL Component, the reward for the previous-current
									target location pair is updated.
								</p>
								<p>
									Then,{" "}
									<BSInlineFunction
										className={"USpawnAreaManagerComponent"}
										functionName={"HandleRecentTargetRemoval"}
									/>{" "}
									is called. This function removes the Activated flag from the SpawnArea and flags it
									as Recent. A timer is set based on the <em>Recent Target Memory Policy</em> and the
									Recent flag is then removed when the timer expires. Upon removal of the Recent flag,
									the overlapping vertices that were generated when the target was spawned are
									emptied.
								</p>
								<p>
									If the game mode uses a Recent Target Memory Policy that keeps the footprint of
									recent targets too long, targets won&#39;t have anywhere to be spawned. Figure 4
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
											<p className="figlabel">Figure 4: </p>
											All Spawn Areas for a game mode using a Recent Target Memory Policy that
											keeps targets for 1.5 seconds after they are deactivated.
										</figcaption>
									</div>
								</figure>
								<p>
									Finally, the target then checks its Target Deactivation Conditions to see if it
									should deactivate. Deactivation conditions are solely based on whether or not the
									target expired. If a deactivation condition was met,{" "}
									<BSInlineFunction
										className={"ATarget"}
										functionName={"HandleDeactivationResponses"}
									/>{" "}
									is called.
								</p>
								<BSCodeBlock code={HandleDeactivation} fontSize="0.65rem" />
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
