"use client";

import React, { useRef } from "react";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import { BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { MultiImageCarousel } from "@/components/ImageCarousel";
import Sidebar from "@/components/Sidebar";
import SidebarHashLink from "@/components/SidebarHashLink";
import useOnScreen from "@/hooks/useScreenObserver";

import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import SpawningWithoutIntersection1 from "public/spawningWithoutIntersection/SpawningWithoutIntersection1.png";
import SpawningWithoutIntersection2 from "public/spawningWithoutIntersection/SpawningWithoutIntersection2.png";
import SpawningWithoutIntersection3 from "public/spawningWithoutIntersection/SpawningWithoutIntersection3.png";
import SpawningWithoutIntersection4 from "public/spawningWithoutIntersection/SpawningWithoutIntersection4.png";
import SpawningWithoutIntersection5 from "public/spawningWithoutIntersection/SpawningWithoutIntersection5.png";
import SpawningWithoutIntersection6 from "public/spawningWithoutIntersection/SpawningWithoutIntersection6.png";
import SpawningWithoutIntersection7 from "public/spawningWithoutIntersection/SpawningWithoutIntersection72.png";
import image_Hero from "public/targetSpawningSystem/SpawnMemory_Hero_Cropped.png";
import image_Card from "public/targetSpawningSystem/TargetSpawningSystemCard.png";

import type { BlogPostData } from "@/types/blog.types";

const titleShort = "Spawning Targets Without Intersection | Developer Blog";
const titleLong = "Spawning Targets Without Intersection";
const description = "TODO";
const postDate: DateTime = DateTime.fromFormat("July 4, 2024", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 4, 2024", "DDD");

const SpawningTargetsWithoutIntersection = () => {
	const Ref_PlaceHolder1 = useRef(null);
	const Ref_Issues = useRef(null);
	const Ref_Testing = useRef(null);
	const Ref_Conclusion = useRef(null);
	const onScreen_PlaceHolder1 = useOnScreen(Ref_PlaceHolder1);
	const onScreen_Testing = useOnScreen(Ref_Testing);
	const onScreen_Issues = useOnScreen(Ref_Issues);
	const onScreen_Conclusion = useOnScreen(Ref_Conclusion);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#placeholder-1`} onScreen={onScreen_PlaceHolder1} topLevelLink={true}>
						Placeholder
					</SidebarHashLink>
				</li>
				<li>
					<SidebarHashLink
						hash={`#issues`}
						onScreen={!onScreen_PlaceHolder1 && onScreen_Issues}
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
							<p>TODO: Intro</p>
							<div className="article-section" ref={Ref_PlaceHolder1} id="placeholder-1">
								<BlogHeading headingText="Placeholder" headingLevel={1} />
								<p>
									One of the most challenging aspects of creating BeatShot was coming up with a way to
									pseudo-randomly spawn targets anywhere within the spawn area without intersecting
									other targets. This by itself seems easy, but when targets can spawn in varying
									sizes and can move, it quickly becomes complicated.
								</p>
								<p>
									When searching for valid Spawn Areas to spawn targets inside, the goal is to obtain
									a set of Spawn Areas where targets will not intersect or collide with targets that
									are already spawned.
								</p>
								<p>General Procedure:</p>
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
							</div>
							<div className="article-section-row">
								<div className="div-50" id="">
									<ul>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The green box in Figure TODO.1 represents the managed Spawn Area for this
											example.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The spheres shown in Figure TODO.2 in show the limits of where a target can
											spawn in the Spawn Area (four corners).
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<MathJax inline={true}>
												The minimum radius, <span>{`$\\text{R}_{min}$`}</span> is half the
												maximum width/height of the Spawn Area, shown in Figure TODO.3.
											</MathJax>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<MathJax inline={true}>
												The current radius, <span>{`$\\text{R}_{current}$`}</span> is the radius
												of the target that we want to spawn. The existing radius,{" "}
												<span>{`$\\text{R}_{existing}$`}</span> is the radius of the target
												already spawned in the Spawn Area. Both are shown in Figure TODO.4.
											</MathJax>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											<MathJax inline={true}>
												We only care about the maximum of <span>{`$\\text{R}_{current}$`}</span>{" "}
												and <span>{`$\\text{R}_{existing}$`}</span> since the largest is the
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
												The rounded up value is multiplied by <span>{`$2\\sqrt{2}$`}</span> so
												that the diagonal vertices are included in the sphere. The result is{" "}
												<span>{`$\\text{R}_{trace}$`}</span>, shown in Figure TODO.5
											</MathJax>
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The white and red vertices in Figure TODO.6 are the vertices that the sphere
											trace captured.
										</li>
										<li>
											<FontAwesomeIcon icon={faCrosshairs} className="li-icon" />
											The red boxes in Figure TODO.7 show the Spawn Areas that correspond to the
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
												figNumber: 0.1,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection2,
												figNumber: 0.2,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection3,
												figNumber: 0.3,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection4,
												figNumber: 0.4,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection5,
												figNumber: 0.5,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection6,
												figNumber: 0.6,
												alt: "TODO",
											},
											{
												image: SpawningWithoutIntersection7,
												figNumber: 0.7,
												alt: "TODO",
											},
										]}
									/>
								</div>
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
								<p>TODO: Testing</p>
							</div>
							<div className="article-section" ref={Ref_Conclusion} id="conclusion">
								<BlogHeading headingText="Conclusion" headingLevel={1} />
							</div>
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
