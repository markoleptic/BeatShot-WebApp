export const EGridIndexType = `enum class EGridIndexType: uint8
{
    Corner_TopLeft,
    Corner_TopRight,
    Corner_BottomRight,
    Corner_BottomLeft,
    Border_Top,
    Border_Right,
    Border_Bottom,
    Border_Left,
    Middle,
};
`;

export const TargetManagerTestWithWorldInit = `bool FTargetManagerTestWithWorld::Init()
{
    World = UWorld::CreateWorld(EWorldType::Game, false);
    UPackage* Package = World->GetPackage();
    Package->SetFlags(RF_Transient | RF_Public);
    Package->AddToRoot();

    FWorldContext& WorldContext = GEngine->CreateNewWorldContext(EWorldType::Game);
    WorldContext.SetCurrentWorld(World);

    InitialFrameCounter = GFrameCounter;
    World->InitializeActorsForPlay(FURL());
    World->BeginPlay();

    return InitTargetManager();
}`;

export const TargetManagerTestWithWorldInitTargetManager = `bool FTargetManagerTestWithWorld::InitTargetManager()
{
    UObject* LoadedObject = StaticLoadObject(UObject::StaticClass(), nullptr, TargetManagerAssetPath);
    if (!LoadedObject)
    {
        AddError("Failed to load Target Manager");
        return false;
    }
    const UBlueprint* BlueprintClass = Cast<UBlueprint>(LoadedObject);
    const TSubclassOf<UObject> GeneratedClass = BlueprintClass->GeneratedClass;
    TargetManager = World->SpawnActor<ATargetManager>(GeneratedClass, TargetManagerTransform, FActorSpawnParameters());
    if (!TargetManager)
    {
        AddError("Failed to spawn Target Manager");
        return false;
    }

    TargetManager->AddToRoot();
    TargetManager->DispatchBeginPlay();
    TargetManager->ExecutionTimeDelegate.BindRaw(this, &FTargetManagerTestWithWorld::UpdateExecutionTime);

    return true;
}`;

export const DeactivationConditions = `enum class ETargetDeactivationCondition : uint8
{
    OnAnyExternalDamageTaken,
    OnExpiration,
    OnHealthReachedZero,
    OnSpecificHealthLost,
};`;

export const DestructionConditions = `enum class ETargetDestructionCondition : uint8
{
    OnExpiration,
    OnAnyExternalDamageTaken,
    OnHealthReachedZero,
    OnDeactivation
};`;

export const SpawnResponses = `enum class ETargetSpawnResponse : uint8
{
    ChangeDirection,
    ChangeVelocity,
    AddImmunity,
};`;

export const ActivationResponses = `enum class ETargetActivationResponse : uint8
{
    RemoveImmunity,
    AddImmunity,
    ToggleImmunity,
    ChangeDirection,
    ChangeVelocity,
    ApplyConsecutiveTargetScale,
    ApplyLifetimeTargetScaling,
};`;

export const DeactivationResponses = `enum class ETargetDeactivationResponse : uint8
{
    RemoveImmunity,
    AddImmunity,
    ToggleImmunity,
    ApplyDeactivatedTargetScaleMultiplier,
    ResetScaleToSpawnedScale,
    ResetPositionToSpawnedPosition,
    ResetColorToInactiveColor,
    ShrinkQuickGrowSlow,
    PlayExplosionEffect,
    Destroy,
    HideTarget,
    ChangeDirection,
    ChangeVelocity,
    ResetScaleToActivatedScale,
    ResetPositionToActivatedPosition,
    Reactivate,
};

`;
