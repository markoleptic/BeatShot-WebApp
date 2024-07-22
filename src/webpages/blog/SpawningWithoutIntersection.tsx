"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import blogPostData from "@/components/blog/SpawningWithoutIntersectionData";
import {
	TargetManagerTestWithWorldInit,
	TargetManagerTestWithWorldInitTargetManager,
} from "@/components/blog/TargetSpawningSystemFunctions";
import { BlogHeading } from "@/components/BlogHeading";
import { BSCodeBlock, BSInlineCode, BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
import { ConsistentHeightMultiImageCarousel, StaticMultiImageCarousel } from "@/components/ImageCarousel";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import { MathJax, MathJax3Config, MathJaxContext } from "better-react-mathjax";
import image_Card from "public/spawningWithoutIntersection/Card.jpg";
import image_Hero from "public/spawningWithoutIntersection/Hero.jpg";
import OverlappingBottomLeft from "public/spawningWithoutIntersection/Overlapping_BottomLeftPoint.png";
import OverlappingCenter from "public/spawningWithoutIntersection/Overlapping_CenterPoint.png";
import OverlappingVertices from "public/spawningWithoutIntersection/OverlappingVertices.jpg";
import SpawningWithoutIntersection1 from "public/spawningWithoutIntersection/SpawningWithoutIntersection1.png";
import SpawningWithoutIntersection2 from "public/spawningWithoutIntersection/SpawningWithoutIntersection2.png";
import SpawningWithoutIntersection3 from "public/spawningWithoutIntersection/SpawningWithoutIntersection3.png";
import SpawningWithoutIntersection4 from "public/spawningWithoutIntersection/SpawningWithoutIntersection4.png";
import SpawningWithoutIntersection5 from "public/spawningWithoutIntersection/SpawningWithoutIntersection5.png";
import SpawningWithoutIntersection6 from "public/spawningWithoutIntersection/SpawningWithoutIntersection6.png";
import SessionFrontendAllSizes from "public/testing/SessionFrontendAllSizes.png";
import SessionFrontendAutomation from "public/testing/SessionFrontendAutomation.png";
import SessionFrontendBig from "public/testing/SessionFrontendBig.png";
import SessionFrontendBottom from "public/testing/SessionFrontendBottom.png";
import SessionFrontendConsoleMain from "public/testing/SessionFrontendConsoleMain.png";
import SessionFrontendSmall from "public/testing/SessionFrontendSmall.png";

const SpawningTargetsWithoutIntersection = () => {
	const Ref_SphereTrace = useRef(null);
	const Ref_Issues = useRef(null);
	const Ref_Testing = useRef(null);
	const ref_CollisionTesting = useRef(null);
	const Ref_Conclusion = useRef(null);
	const onScreen_SphereTrace = useOnScreen(Ref_SphereTrace);
	const onScreen_Testing = useOnScreen(Ref_Testing);
	const onScreen_CollisionTesting = useOnScreen(ref_CollisionTesting);
	const onScreen_Issues = useOnScreen(Ref_Issues);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#sphere-trace`} onScreen={onScreen_SphereTrace} topLevelLink={true}>
						Sphere Trace
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#issues`}
						onScreen={!onScreen_SphereTrace && onScreen_Issues}
						topLevelLink={true}
					>
						Issues
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#testing`}
						onScreen={!onScreen_Issues && onScreen_Testing}
						topLevelLink={true}
					>
						Testing
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#collision-testing`}
								onScreen={!onScreen_Issues && onScreen_Testing && onScreen_CollisionTesting}
							>
								Collision Testing
							</SidebarHashLink>
						</li>
					</ul>
				</li>
				<li>
					<SidebarHashLink
						hash={`#conclusion`}
						onScreen={!onScreen_Testing && onScreen_Conclusion}
						topLevelLink={true}
					>
						Conclusion
					</SidebarHashLink>
				</li>
			</ul>
		</Sidebar>
	);
	const equations = `
		\\begin{align*}
		R_{min} &= \\frac{\\max(\\text{Width}_{\\text{SpawnArea}}, \\text{Height}_{\\text{SpawnArea}})}{2} \\\\
		R_{current} &= \\text{Radius of target to be spawned} \\\\
		R_{existing} &= \\text{Radius of existing target} \\\\
		R_{trace} &= \\text{ceil}\\left(\\frac{\\max(R_{current}, R_{existing})}{R_{min}} \\right) \\times R_{min} \\times 2\\sqrt{2}
		\\end{align*}
`;
	const config: MathJax3Config = {
		options: {
			renderActions: {
				addMenu: [0, "", ""],
			},
		},
		loader: { load: ["[tex]/html"] },
		tex: {
			packages: { "[+]": ["html"] },
			inlineMath: [
				["$", "$"],
				["\\(", "\\)"],
			],
			displayMath: [
				["$$", "$$"],
				["\\[", "\\]"],
			],
		},
	};
	return (
		<>
			<MathJaxContext version={3} config={config}>
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
								One of the most challenging aspects of creating BeatShot was coming up with a way to
								pseudo-randomly spawn targets without intersecting other targets. This by itself seems
								easy, but when targets can spawn with varying sizes and can move, it quickly becomes
								complicated.
							</p>
							<div className="article-section" ref={Ref_SphereTrace} id="sphere-trace">
								<BlogHeading headingText="Sphere Trace" headingLevel={1} />
								<p>
									When searching for valid Spawn Areas to spawn targets inside, the goal is to obtain
									a set of Spawn Areas where targets will not intersect or collide with targets that
									are already spawned. The general procedure is as follows:
								</p>
								<ul>
									<p>For each managed, activated, or recent Spawn Area:</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Trace a sphere with its origin at the bottom left vertex of the Spawn Area.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Use vertices within the sphere trace to find corresponding Spawn Areas.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Remove these Spawn Areas from consideration.
									</li>
								</ul>
								<div className="padding-top-05rem padding-bottom-05rem">
									<div className="figure-border-container-math">
										<figure className="figure-border-container-math-inner">
											<MathJax className="fs-300">{`\\[ ${equations} \\]`}</MathJax>
											<figcaption>
												<p className="figlabel">Figure 1: </p>
												Equations for calculating{" "}
												<MathJax inline={true}>
													<span>{`$\\text{R}_{min}$`}</span>
												</MathJax>{" "}
												and{" "}
												<MathJax inline={true}>
													<span>{`$\\text{R}_{trace}$`}</span>
												</MathJax>
											</figcaption>
										</figure>
									</div>
								</div>
								<p>
									<MathJax inline={true}>
										Figure 1 shows the equations used to derive the radius of the sphere trace,{" "}
										<span>{`$\\text{R}_{trace}$`}</span>, at each iteration. We only care about the
										larger of <span>{`$\\text{R}_{current}$`}</span> and{" "}
										<span>{`$\\text{R}_{existing}$`}</span> since the maximum is the worst-case
										scenario. This value is rounded up to the nearest multiple of{" "}
										<span>{`$\\text{R}_{min}$`}</span> and multiplied by{" "}
										<span>{`$2\\sqrt{2}$`}</span> so that the diagonal vertices are included in the
										trace. Figure 2 walks through a visual representation of obtaining{" "}
										<span>{`$\\text{R}_{trace}$`}</span>.
									</MathJax>
								</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<ConsistentHeightMultiImageCarousel
										images={[
											{
												image: SpawningWithoutIntersection1,
												figNumber: 2.1,
												caption: (
													<MathJax inline={true}>
														The minimum radius, <span>{`$\\text{R}_{Min}$`}</span>, is
														calculated using the existing Spawn Area
													</MathJax>
												),
												alt: "MinimumRadius",
											},
											{
												image: SpawningWithoutIntersection2,
												figNumber: 2.2,
												caption:
													"The limits of where a target can spawn in the Spawn Area (four corners)",
												alt: "SpawnAreaLimits",
											},
											{
												image: SpawningWithoutIntersection3,
												figNumber: 2.3,
												caption: (
													<MathJax inline={true}>
														<span>{`$\\text{R}_{current}$`}</span> is the radius of the
														target that we want to spawn, while{" "}
														<span>{`$\\text{R}_{existing}$`}</span> is the radius of the
														target already spawned in the Spawn Area
													</MathJax>
												),
												alt: "ExistingRadius",
											},
											{
												image: SpawningWithoutIntersection4,
												figNumber: 2.4,
												caption:
													"The sphere trace is performed at the bottom-left vertex of the existing Spawn Area",
												alt: "TraceRadius",
											},
											{
												image: SpawningWithoutIntersection5,
												figNumber: 2.5,
												caption: "The white and red vertices are captured by the sphere trace",

												alt: "CapturedVertices",
											},
											{
												image: SpawningWithoutIntersection6,
												figNumber: 2.6,
												caption:
													"The red boxes show the Spawn Areas that correspond to the vertices captured in the sphere trace",
												alt: "CapturedSpawnAreas",
											},
										]}
									/>
								</div>
								<p>
									The lower bound of the sphere trace is based on the Spawn Area dimensions, meaning
									that no matter the target radius, the trace will always capture at least nine
									vertices.
								</p>
								<p>
									Figure 3 and 4 illustrate the difference between using the center and bottom left
									vertex as the sphere trace origin. Since a target may spawn anywhere within a Spawn
									Area, the center vertex approach causes a collision due to targets spawning near the
									edges of their Spawn Area. Using the bottom left vertex guarantees that targets will
									not collide due to spawning on the edges.
								</p>
								<div className="static-article-section-row align-self-center max-width-850 padding-top-05rem padding-bottom-05rem">
									<div className="div-50 flex-row justify-content-flex-end">
										<Figure
											className="align-self-stretch justify-content-flex-start"
											image={OverlappingCenter}
											figNumber={3}
											figCaption="Overlapping vertices generated using the center vertex"
											alt="OverlappingVerticesCenter"
										/>
									</div>
									<div className="div-50 flex-row justify-content-flex-start">
										<Figure
											className="align-self-stretch justify-content-flex-start"
											image={OverlappingBottomLeft}
											figNumber={4}
											figCaption="Overlapping vertices generated using the bottom left vertex"
											alt="OverlappingVerticesBottomLeft"
										/>
									</div>
								</div>
								<p>
									Figure 5 shows what the results of the sphere trace look like in-game. The red
									points indicate vertices within the sphere trace, while the red boxes are the
									overlapping Spawn Areas. Green boxes represent non-overlapping Spawn Areas.
								</p>
								<p>
									For smaller targets, the sphere trace looks more like a cube trace, but becomes more
									spherical as target size increases. The shape variation is also influenced by the
									chosen Spawn Area resolution. If Spawn Areas were 25x25 instead of 50x50, the
									spherical shape would be more apparent at the cost of increased computation
									resources. Green points denote vertices outside the largest target&#39;s sphere
									trace, while blue points mark the bottom-left vertices of Spawn Areas. Some of these
									points are not visible due to target size.
								</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<Figure
										image={OverlappingVertices}
										figNumber={5}
										figCaption="In-Game Representation of Overlapping vertices"
										alt="OverlappingVertices"
									/>
								</div>
							</div>
							<div className="article-section" ref={Ref_Issues} id="issues">
								<BlogHeading headingText="Issues" headingLevel={1} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										The method is conservative, always rounding up to the nearest Spawn Area
										dimension to account for the worst-case scenario.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Sphere trace vertex generation is computationally expensive but could be
										pre-computed during initialization since there will only ever be a few sets of
										generated vertices due to rounding up and having a max target size.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Duplicate calculations occur for adjacent Spawn Areas, though this is not a
										major concern as few targets are ever actually spawned at once.
									</li>
								</ul>
							</div>
							<div className="article-section" ref={Ref_Testing} id="testing">
								<BlogHeading headingText="Testing" headingLevel={1} />
								<p>
									Unreal Engine provides the Automation System for testing. The Automation test (
									<BSInlineCode>FAutomationTestBase</BSInlineCode>) is the lowest level of automated
									testing and operates outside of the <BSInlineCode>UObject</BSInlineCode> ecosystem.
									The common lifecycle functions that <BSInlineCode>UObject</BSInlineCode> classes
									depend on, such as all the target spawning system classes, aren’t executed without a
									world actor. Additionally, you can’t spawn actors without a world. To solve these
									problems, I created a class that inherits from{" "}
									<BSInlineCode>FAutomationTestBase</BSInlineCode> called{" "}
									<BSInlineCode>FTargetManagerTestWithWorld</BSInlineCode>.
								</p>
								<p>
									<BSInlineFunction>::Init</BSInlineFunction> creates the world, adds the package to
									the root, and creates a game world context.{" "}
									<BSInlineFunction>::InitializeActorsForPlay</BSInlineFunction> and{" "}
									<BSInlineFunction>::BeginPlay</BSInlineFunction> must be called in order for things
									to operate smoothly. The last function <BSInlineFunction>::Init</BSInlineFunction>{" "}
									calls is <BSInlineFunction>::InitTargetManager</BSInlineFunction>.
								</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<BSCodeBlock>{TargetManagerTestWithWorldInit}</BSCodeBlock>
								</div>
								<p>
									The blueprint version of the Target Manager class is loaded using{" "}
									<BSInlineFunction>::StaticLoadObject</BSInlineFunction>. This is due to the fact
									that <BSInlineCode>FTargetManagerTestWithWorld</BSInlineCode> is a{" "}
									<span className="inline-flex">C++</span> only class deriving from{" "}
									<BSInlineCode>FAutomationTestBase</BSInlineCode>, which cannot be used with the
									reflection system. The Target Manager is spawned using the blueprint generated class
									and is added to the root set of actors to prevent garbage collection.{" "}
									<BSInlineFunction>::DispatchBeginPlay</BSInlineFunction> is called to trigger the
									chain of events that allow the actor to sync with the{" "}
									<BSInlineCode>UObject</BSInlineCode> lifecycle functions.
								</p>
								<div className="padding-top-05rem">
									<BSCodeBlock>{TargetManagerTestWithWorldInitTargetManager}</BSCodeBlock>
								</div>
								<div className="article-subsection" ref={ref_CollisionTesting} id="collision-testing">
									<BlogHeading headingText="Collision Testing" headingLevel={2} />
									<p>
										The <BSInlineCode>FTargetCollisionTest</BSInlineCode> class inherits from{" "}
										<BSInlineCode>FTargetManagerTestWithWorld</BSInlineCode>, and has two notable
										functions, <BSInlineFunction>::GetTests</BSInlineFunction> and{" "}
										<BSInlineFunction>::RunTest</BSInlineFunction>. The Automation Controller calls{" "}
										<BSInlineFunction>::GetTests</BSInlineFunction> to populate the array of test
										names and commands. The Automation Controller will call{" "}
										<BSInlineFunction>::RunTest</BSInlineFunction> using each of the test commands.
									</p>
									<p>
										Inside <BSInlineFunction>::GetTests</BSInlineFunction>, a data asset is loaded
										containing different BeatShot game modes to test. Each game mode name is added
										as a test name and command. The game mode name and configuration are added to a
										map that is iterating through during{" "}
										<BSInlineFunction>::RunTest</BSInlineFunction>.
									</p>

									<ul>
										<p>
											When <BSInlineFunction>::RunTest</BSInlineFunction> is called, the temporary
											world is created and the configuration from the map is used to initialize
											the Target Manager. The following steps are performed during each of the 500
											iterations:
										</p>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<BSInlineFunction>::HandleAudioAnalyzerBeat</BSInlineFunction> is manually
											called to spawn the targets.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											All targets that were spawned are obtained from the Target Manager.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Primitive sphere objects are created to represent the targets, and the
											spheres are added to an array.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Each target is told to destroy itself and treat it as if it were external
											damage.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The world is ticked so that classes inheriting from{" "}
											<BSInlineCode>UObject</BSInlineCode> get a chance to tick.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											All spheres are tested for intersection against each other.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The test verifies that all targets have been destroyed at the end of the
											iteration.
										</li>
									</ul>
									<p>
										Testing every single sphere against one another isn’t very efficient, but I
										didn’t want to add additional complexity and the calculation is simple and
										quick. After the iterations are complete, some additional information is added,
										the test variables are reset, and the world is destroyed.
									</p>

									<div className="article-subsection-2" ref={null} id="session-frontend">
										<BlogHeading headingText="Session Frontend" headingLevel={3} />

										<p>
											Automation tests can be run from the command line, inside the Unreal Editor,
											or inside an IDE. The code block below shows the command I use to execute
											the collision tests from the command line. The arguments ensure that no
											splash screen appears, no process window is created, the test output is
											logged, and only tests matching the name
											&#34;TargetManager.TargetCollision&#34; are executed.
										</p>
										<div className="code-border-container padding-top-05rem padding-bottom-05rem">
											<div className="code-border">
												<div className="codeblock-container">
													<span
														className={`inline-code fs-75 text-white padding-05rem line-height-1_5`}
													>
														<span className="text-lightgrey">{`U:/EpicGames/UE_5.4_Source_Installed/Engine/Binaries/Win64/UnrealEditor.exe `}</span>
														<span className="text-green">{`C:/P4-Workspaces/mark_BeatShot/BeatShot/BeatShot.uproject `}</span>
														<span className="text-yellow">{`-nullrhi -nosplash -stdout -unattended -nopause -nosound -log -ExecCmds`}</span>
														<span className="text-red">{`=`}</span>
														<span className="text-green">{`Automation RunTest TargetManager.TargetCollision; Quit`}</span>
													</span>
												</div>
											</div>
										</div>
										<p>
											The Session Frontend is the GUI for automation testing available in the
											Unreal Editor. Figure 6 shows the test browser after running the three
											different types of <BSInlineCode>FTargetCollisionTest</BSInlineCode> I
											created: All Sizes, Large, and Small. These are automatically populated by
											the Automation Controller when it calls{" "}
											<BSInlineFunction>::GetTests</BSInlineFunction>.{" "}
											<BSInlineCode>FTargetCollisionTest</BSInlineCode> overrides the{" "}
											<BSInlineFunction>::GetBeautifiedTestName</BSInlineFunction> function so
											that the tests show up under the TargetManager &#8594; TargetCollision
											category.
										</p>
										<div className="padding-top-05rem padding-bottom-05rem">
											<Figure
												image={SessionFrontendAutomation}
												figNumber={6}
												figCaption="Unreal Engine Session Frontend"
												alt="SessionFrontend"
											/>
										</div>
										<p>
											Figure 7 shows the console tab of the Session Frontend. The information I
											added at the end of each collision test is printed to the console after each
											of the three collision tests. Just over 147,000 targets were spawned across
											all three tests, which took around four minutes to complete. Targets are
											much more likely to collide when the target size is varied, as shown by the
											All Sizes test having the smallest minimum distance between two spheres of
											1.57.
										</p>
										<div className="padding-top-05rem padding-bottom-05rem">
											<StaticMultiImageCarousel
												images={[
													{
														image: SessionFrontendAllSizes,
														figNumber: 7.1,
														alt: "AllTargetSizesCollisionTest",
														caption: "Console Output From All Target Sizes Collision Test",
													},
													{
														image: SessionFrontendBig,
														figNumber: 7.2,
														alt: "LargeTargetCollisionTest",
														caption: "Console Output From Large Target Collision Test",
													},
													{
														image: SessionFrontendSmall,
														figNumber: 7.3,
														alt: "SmallTargetCollisionTest",
														caption: "Console Output From Small Target Collision Test",
													},
												]}
												staticTop={{
													image: SessionFrontendConsoleMain,
													figNumber: 0,
													alt: "SessionFrontendConsoleMain",
												}}
												staticBottom={{
													image: SessionFrontendBottom,
													figNumber: 0,
													alt: "SessionFrontendBottom",
												}}
											/>
										</div>
										<p>
											The total time spent executing{" "}
											<BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> doesn&#39;t tell
											us much about the results by itself, but when divided by the total targets
											spawned, it approximates the time taken to spawn each target. On average,
											All Sizes took 0.136 ms to spawn each target, Large took 0.497 ms, and Small
											took 0.096 ms. It make sense that larger targets resulted in longer
											execution times due more Spawn Areas being captured in the sphere trace.
										</p>
									</div>
								</div>
							</div>
							<div className="article-section" ref={Ref_Conclusion} id="conclusion">
								<BlogHeading headingText="Conclusion" headingLevel={1} />
								<p>
									Since no collisions occurred across over 147,000 target spawns and the minimum
									distance between two targets was relatively small, I conclude that the trace radius
									used during <BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is correct
									and minimal. There is certainly room for improvement and optimization but long as
									there are no collisions, I am satisfied.
								</p>
							</div>
							<ArticleDateFooter postDate={blogPostData.postDate} editDate={blogPostData.editDate} />
						</article>
					</div>
				</div>
			</MathJaxContext>
		</>
	);
};

export default SpawningTargetsWithoutIntersection;
