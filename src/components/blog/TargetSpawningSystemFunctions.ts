export const OnAudioAnalyzerBeat = `void ATargetManager::OnAudioAnalyzerBeat()
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

export const ActivateTarget = `bool ATargetManager::ActivateTarget(ATarget* InTarget) const
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

export const FindNextTargetProperties = `void ATargetManager::FindNextTargetProperties()
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

export const EGridIndexType = `UENUM(BlueprintType)
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

export const GetValidSpawnLocations = `TArray<FVector> USpawnAreaManagerComponent::GetValidSpawnLocations(const FVector& Scale, 
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

export const SpawnTarget = `ATarget* ATargetManager::SpawnTarget(USpawnArea* InSpawnArea)
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

export const RemovingOverlappingSpawnLocations = `void USpawnAreaManagerComponent::RemoveOverlappingSpawnLocations(TArray<FVector>& SpawnLocations, const FVector& Scale) const
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

export const HandleDeactivation = `void ATarget::HandleDeactivationResponses(const bool bExpired)
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
