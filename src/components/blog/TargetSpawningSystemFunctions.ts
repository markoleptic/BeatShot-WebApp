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
