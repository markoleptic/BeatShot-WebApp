"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";

import ArticleDateFooter from "@/components/blog/ArticleDateFooter";
import {
	TargetManagerTestWithWorldInit,
	TargetManagerTestWithWorldInitTargetManager,
} from "@/components/blog/TargetSpawningSystemFunctions";
import { BlogHeading } from "@/components/BlogHeading";
import { BSCodeBlock, BSInlineCode, BSInlineFunction } from "@/components/CodeBlock";
import Figure from "@/components/Figure";
import { DualImageCarousel, MultiImageCarousel, StaticMultiImageCarousel } from "@/components/ImageCarousel";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import OverlappingBottomLeft from "public/spawningWithoutIntersection/Overlapping_BottomLeftPoint.png";
import OverlappingCenter from "public/spawningWithoutIntersection/Overlapping_CenterPoint.png";
import OverlappingVerts from "public/spawningWithoutIntersection/OverlappingVerts.png";
import SpawningWithoutIntersection1 from "public/spawningWithoutIntersection/SpawningWithoutIntersection1.png";
import SpawningWithoutIntersection2 from "public/spawningWithoutIntersection/SpawningWithoutIntersection2.png";
import SpawningWithoutIntersection3 from "public/spawningWithoutIntersection/SpawningWithoutIntersection3.png";
import SpawningWithoutIntersection4 from "public/spawningWithoutIntersection/SpawningWithoutIntersection4.png";
import SpawningWithoutIntersection5 from "public/spawningWithoutIntersection/SpawningWithoutIntersection5.png";
import SpawningWithoutIntersection6 from "public/spawningWithoutIntersection/SpawningWithoutIntersection6.png";
import SpawningWithoutIntersection7 from "public/spawningWithoutIntersection/SpawningWithoutIntersection7.png";
import image_Hero from "public/targetSpawningSystem/SpawnMemory_Hero_Cropped.png";
import image_Card from "public/targetSpawningSystem/TargetSpawningSystemCard.png";
import SessionFrontendAllSizes from "public/testing/SessionFrontendAllSizes.png";
import SessionFrontendAutomation from "public/testing/SessionFrontendAutomation.png";
import SessionFrontendBig from "public/testing/SessionFrontendBig.png";
import SessionFrontendBottom from "public/testing/SessionFrontendBottom.png";
import SessionFrontendConsoleMain from "public/testing/SessionFrontendConsoleMain.png";
import SessionFrontendSmall from "public/testing/SessionFrontendSmall.png";

import type { BlogPostData } from "@/types/blog.types";

const titleShort = "Spawning Targets Without Intersection | Developer Blog";
const titleLong = "Spawning Targets Without Intersection";
const description =
	"This article discusses the methods used to prevent target intersection and includes a section on testing " +
	"procedures created using Unreal Engine's Automation System.";
const postDate: DateTime = DateTime.fromFormat("July 17, 2024", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 17, 2024", "DDD");

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

	const config = {
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
							<h1>{titleLong}</h1>
							<p className="hero-lead">{description}</p>
							<Image className="hero-image" priority src={image_Hero} quality={100} alt="logo" />
						</div>
					</div>
					<div className="flex-container-row">
						{sideBar}
						<article className="devblog-article flex-container-column" id="article">
							<p>
								One of the most challenging aspects of creating BeatShot was coming up with a way to
								pseudo-randomly spawn targets anywhere within the spawn area without intersecting other
								targets. This by itself seems easy, but when targets can spawn with varying sizes and
								can move, it quickly becomes complicated.
							</p>
							<div className="article-section" ref={Ref_SphereTrace} id="sphere-trace">
								<BlogHeading headingText="Sphere Trace" headingLevel={1} />
								<p>
									When searching for valid Spawn Areas to spawn targets inside, the goal is to obtain
									a set of Spawn Areas where targets will not intersect or collide with targets that
									are already spawned. The general procedure is as follows:
								</p>
								<ul>
									<p>
										For each Managed Spawn Area (implies either activated/deactivated target exists
										inside):
									</p>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Trace a sphere with its origin at the bottom left vertex of the Spawn Area
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Use vertices that fall within the sphere trace to find the corresponding Spawn
										Areas
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Remove these Spawn Areas from consideration
									</li>
								</ul>
								<MathJax> {`\\[ ${equations} \\]`}</MathJax>
								<div className="article-section-row">
									<div className="div-50" id="">
										<ul>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The green box in Figure 1.1 represents the managed Spawn Area for this
												example.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The spheres shown in Figure 1.2 in show the limits of where a target can
												spawn in the Spawn Area (four corners).
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<MathJax inline={true}>
													The minimum radius, <span>{`$\\text{R}_{min}$`}</span> is half the
													maximum width/height of the Spawn Area, shown in Figure 1.3.
												</MathJax>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<MathJax inline={true}>
													The current radius, <span>{`$\\text{R}_{current}$`}</span> is the
													radius of the target that we want to spawn. The existing radius,{" "}
													<span>{`$\\text{R}_{existing}$`}</span> is the radius of the target
													already spawned in the Spawn Area. Both are shown in Figure 1.4.
												</MathJax>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<MathJax inline={true}>
													We only care about the maximum of{" "}
													<span>{`$\\text{R}_{current}$`}</span> and{" "}
													<span>{`$\\text{R}_{existing}$`}</span> since the largest is the
													worse-case scenario.
												</MathJax>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<MathJax inline={true}>
													The maximum is rounded up to the nearest multiple of{" "}
													<span>{`$\\text{R}_{min}$`}</span> by dividing by{" "}
													<span>{`$\\text{R}_{min}$`}</span>, taking the{" "}
													<span>{`$\\text{ceil}$`}</span>, and then multiplying by{" "}
													<span>{`$\\text{R}_{min}$`}</span>.
												</MathJax>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												<MathJax inline={true}>
													The rounded up value is multiplied by <span>{`$2\\sqrt{2}$`}</span>{" "}
													so that the diagonal vertices are included in the sphere. The result
													is <span>{`$\\text{R}_{trace}$`}</span>, shown in Figure 1.5
												</MathJax>
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The white and red vertices in Figure 1.6 are the vertices that the
												sphere trace captured.
											</li>
											<li>
												<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
												The red boxes in Figure 1.7 show the Spawn Areas that correspond to the
												vertices captured in the sphere trace.
											</li>
										</ul>
									</div>
									<div className="div-50 justify-content-center">
										<MultiImageCarousel
											imageClassName="height-400-width-100"
											images={[
												{
													image: SpawningWithoutIntersection1,
													figNumber: 1.1,
													alt: "ManagedSpawnArea",
												},
												{
													image: SpawningWithoutIntersection2,
													figNumber: 1.2,
													alt: "SpawnAreaLimits",
												},
												{
													image: SpawningWithoutIntersection3,
													figNumber: 1.3,
													alt: "MinimumRadius",
												},
												{
													image: SpawningWithoutIntersection4,
													figNumber: 1.4,
													alt: "ExistingRadius",
												},
												{
													image: SpawningWithoutIntersection5,
													figNumber: 1.5,
													alt: "TraceRadius",
												},
												{
													image: SpawningWithoutIntersection6,
													figNumber: 1.6,
													alt: "CapturedVertices",
												},
												{
													image: SpawningWithoutIntersection7,
													figNumber: 1.7,
													alt: "CapturedSpawnAreas",
												},
											]}
										/>
									</div>
								</div>
								<div className="padding-top-05rem" />
								<p>
									Figure 2 and 3 show the difference between using the center vertex and the bottom
									left vertex as the sphere trace origin. Since a target may spawn anywhere within a
									Spawn Area, it caused a collision due to targets spawning near the edges of their
									Spawn Area. Using the bottom left vertex guarantees the targets will not collide due
									spawning on the edges.
								</p>
								<div className="article-section-row align-self-center max-width-850 padding-top-05rem padding-bottom-05rem">
									<div className="div-50 flex-row justify-content-flex-end">
										<Figure
											image={OverlappingCenter}
											figNumber={2}
											figCaption="Overlapping vertices generated using the center vertex"
											alt="OverlappingVerticesCenter"
										/>
									</div>
									<div className="div-50 flex-row justify-content-flex-start">
										<Figure
											image={OverlappingBottomLeft}
											figNumber={3}
											figCaption="Overlapping vertices generated using the bottom left vertex"
											alt="OverlappingVerticesBottomLeft"
										/>
									</div>
								</div>
								<p>
									Figure 4 shows what the results of the sphere trace look like in game. The{" "}
									<span className="text-red">red points</span> are vertices that fell within the
									sphere trace for the Spawn Area where a target was spawned, while the{" "}
									<span className="text-red">red boxes</span> are the Spawn Areas that the vertices
									correspond to. The <span className="text-green">green boxes</span> show all Spawn
									Areas that are not overlapping with the spawned targets.
								</p>
								<div className="padding-top-05rem padding-bottom-05rem">
									<Figure
										image={OverlappingVerts}
										imageClassName="max-width-750"
										figNumber={4}
										figCaption="In-Game Representation of Overlapping vertices"
										alt="OverlappingVerts"
									/>
								</div>
								<p>
									For smaller targets, the sphere trace looks more like a cube trace, but as the
									target becomes larger, the trace becomes more spherical in shape. This is also due
									the resolution chosen for the Spawn Areas. If Spawn Areas were 25x25 instead of
									50x50, the spherical shape would be more apparent but at the cost of increased
									computation resources. The <span className="text-green">green points</span> show
									vertices that fell outside the largest target&#39;s sphere trace.
								</p>
								<p>
									The <span className="text-light">blue points</span> are show the bottom-left vertex
									of the Spawn Area that each target is spawned at. Some of these points are not
									visible due to target size.
								</p>
							</div>
							<div className="article-section" ref={Ref_Issues} id="issues">
								<BlogHeading headingText="Issues" headingLevel={1} />
								<ul>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										This approach is very conservative since it’s always rounding up to the nearest
										Spawn Area dimension and must consider the worst-case scenario.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Generating the vertices from the Sphere Trace is expensive, but they could be
										pre-computed at initialization since there will only ever be a few sets of
										generated vertices due to rounding up and having a max target size.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Duplicate calculations will be made since Spawn Areas can be directly beside one
										another and they will only differ by a few vertices.
									</li>
									<li>
										<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
										Since few targets are ever actually spawned at once, this isn’t really a
										concern.
									</li>
								</ul>
							</div>
							<div className="article-section" ref={Ref_Testing} id="testing">
								<BlogHeading headingText="Testing" headingLevel={1} />
								<p>
									Unreal Engine provides the Automation System for testing. The Automation test (
									<BSInlineCode>FAutomationTestBase</BSInlineCode>) is the lowest level of automated
									testing and is outside of the <BSInlineCode>UObject</BSInlineCode> ecosystem. The
									common lifecycle functions that <BSInlineCode>UObject</BSInlineCode> classes depend
									on, such as all the Target Spawning system classes, aren’t executed without a world
									actor. Additionally, you can’t spawn actors without a world. To solve these
									problems, I created a class that is inherited from{" "}
									<BSInlineCode>AutomationTestBase</BSInlineCode> called{" "}
									<BSInlineCode>TargetManagerTestWithWorld</BSInlineCode>.
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
									that <BSInlineCode>TargetManagerTestWithWorld</BSInlineCode> is a{" "}
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
										The <BSInlineCode>TargetCollisionTest</BSInlineCode> class is inherited from{" "}
										<BSInlineCode>TargetManagerTestWithWorld</BSInlineCode>, and has two notable
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
											called to spawn the targets
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											All targets that were spawned are obtained from the Target Manager
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Primitive sphere objects are created to represent the targets, and the
											spheres are added to an array
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											Each target is told to destroy itself and treat it as if it were external
											damage
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The world is ticked so that <BSInlineCode>UObject</BSInlineCode>s get a
											chance to tick
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											All spheres are tested for intersection against each other
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The test verifies that all targets have been destroyed at the end of the
											iteration
										</li>
									</ul>
									<p>
										Testing every single sphere against one another isn’t very efficient but I
										didn’t want to add additional complexity and the calculation is simple and
										quick. After the iterations are complete, some additional information is added,
										the test variables are reset, and the world is destroyed.
									</p>

									<div className="article-subsection-2" ref={null} id="session-frontend">
										<BlogHeading headingText="Session Frontend" headingLevel={3} />
										<p>
											The Session Frontend is the GUI for automation testing available in the
											editor. Automation Tests can also be run using the command line, but I think
											this is slightly more interesting to look at for an article.
										</p>
										<p>
											Figure 5 shows the test browser after running the three different types of{" "}
											<BSInlineCode>TargetCollisionTest</BSInlineCode> I created: All Sizes,
											Large, and Small. These are automatically populated by the Automation
											Controller when it calls <BSInlineFunction>::GetTests</BSInlineFunction>.
										</p>
										<div className="padding-top-05rem padding-bottom-05rem">
											<Figure
												image={SessionFrontendAutomation}
												figNumber={5}
												figCaption="Unreal Engine Session Frontend"
												alt="SessionFrontend"
											/>
										</div>
										<p>
											Figure 6 shows the console tab of the Session Frontend. The information I
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
														figNumber: 6.1,
														alt: "AllTargetSizesCollisionTest",
														caption: "Console Output From All Target Sizes Collision Test",
													},
													{
														image: SessionFrontendBig,
														figNumber: 6.2,
														alt: "LargeTargetCollisionTest",
														caption: "Console Output From Large Target Collision Test",
													},
													{
														image: SessionFrontendSmall,
														figNumber: 6.3,
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
									used during <BSInlineFunction>::GetTargetSpawnParams</BSInlineFunction> is the
									correct and minimum. There is certainly room for improvement and optimization but
									long as there are no collisions, I am satisfied.
								</p>
							</div>
							<ArticleDateFooter postDate={postDate} editDate={editDate} />
						</article>
					</div>
				</div>
			</MathJaxContext>
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

export { SpawningTargetsWithoutIntersection, blogPostData };
