"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { titleLong, description } from "@/pages/blog/TargetSpawningSystem";
import { titleLong as titleLongPart2, description as descriptionPart2 } from "@/pages/blog/TargetSpawningSystemPart2";

import image_TargetSpawningSystem_teaser from "public/TargetSpawningSystem-teaser.png";
import image_Hero from "public/GAS_Diagram.png";

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
								<div className="card-label">{titleLong}</div>
								<p className="card-sub-label">{description}</p>
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
								<div className="card-label">{titleLongPart2}</div>
								<p className="card-sub-label">{descriptionPart2}</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPostsMain;
