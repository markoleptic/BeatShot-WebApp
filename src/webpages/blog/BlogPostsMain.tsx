"use client";
import image_TargetSpawningSystem_teaser from "public/TargetSpawningSystem-teaser.png";
import image_Hero from "public/GAS_Diagram.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import "@/styles/Card.scss";
import "@/styles/Hero.scss";
const BlogPostsMain = () => {
	let router = useRouter();

	const handleClick = async (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => {
		router.push(path);
	};

	return (
		<>
			<div className="flex-container-column">
				<div className="hero-container">
					<div className="hero">
						<h1>BeatShot Developer Blog</h1>
					</div>
				</div>
				<div className="flex-container-row padding-1rem gap-1rem flex-wrap">
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/target-spawning-system">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime="2023-07-02">July 2, 2023 </time>
								</p>
								<Image src={image_TargetSpawningSystem_teaser} alt="TargetSpawningSystem-teaser" />
								<div className="card-label">
									BeatShot&#39;s Target Spawning System: Part 1 - Core Classes, State, and Conventions
								</div>
								<p className="card-sub-label">
									In this first part of the series, I introduce the foundation used to build the
									Target Spawning System in BeatShot. You&#39;ll learn about the classes, state
									management systems, and some of the conventions used to make the game function
									smoothly, alongside insights into the decision-making process that guided their
									selection and implementation.
								</p>
							</div>
						</Link>
					</div>
					<div
						className="card-container gap-1rem padding-1rem"
						onClick={(event) => handleClick(event, `/devblog/gameplay-ability-system-overview`)}
					>
						<Link className="link" href="/devblog/target-spawning-system">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime="2023-09-10">September 15, 2023 </time>
								</p>
								<Image src={image_Hero} alt="TargetSpawningSystem-teaser" />
								<div className="card-label">
									An Overview of Unreal&#39;s Gameplay Ability System in BeatShot
								</div>
								<p className="card-sub-label">
									How is the Gameplay Ability System used in BeatShot? This article shows the
									implementation and walks through the execution of a common ability.
								</p>
							</div>
						</Link>
					</div>
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/target-spawning-system-part-2">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime="2023-07-02">July 2, 2023 </time>
								</p>
								<Image src={image_TargetSpawningSystem_teaser} alt="TargetSpawningSystem-teaser" />
								<div className="card-label">
									BeatShot&#39;s Target Spawning System: Part 2 - Target Lifecycle Timeline
								</div>
								<p className="card-sub-label">
									In this second part of the series, I&#39;ll explain how the core systems from Part 1
									work together. I walk through the lifecycle of targets, outlining the key functions
									and their roles. I also discuss some challenging problems I encountered and how I
									solved them.
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPostsMain;
