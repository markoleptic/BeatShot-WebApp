"use client";

import React, { useRef } from "react";
import useOnScreen from "@/hooks/useScreenObserver";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarHashLink } from "@/components/SidebarHashLink";
import { BSInlineEnum, BSInlineFunction } from "@/components/CodeBlock";
import { BlogHeading, BlogHeadingClass } from "@/components/BlogHeading";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import image_BoxBounds from "public/BoxBounds.png";
import image_ClusterBeat from "public/ClusterBeat.png";
import image_TotalSpawnArea from "public/TotalSpawnArea.png";
import image_Hero from "public/SpawnMemory_Hero_Cropped.png";
import image_SphereColorGradient from "public/SphereColorGradient.png";
import image_BeatGrid from "public/BeatGrid.png";
import image_NonBeatGrid from "public/NonBeatGrid.png";
import "@/styles/Article.scss";
import "@/styles/Hero.scss";
import "@/styles/Utility.scss";
import Link from "next/link";

const titleShort = "Spawning Targets Without Intersection | Developer Blog";
const titleLong = "Spawning Targets Without Intersection";
const description = "";

const SpawningTargetsWithoutIntersection = () => {
	const Ref_Classes = useRef(null);
	const onScreen_Classes = useOnScreen(Ref_Classes);

	const sideBar = (
		<Sidebar>
			<ul>
				<li>
					<SidebarHashLink hash={`#classes-header`} onScreen={onScreen_Classes} topLevelLink={true}>
						Classes
					</SidebarHashLink>
					<ul>
						<li>
							<SidebarHashLink
								hash={`#classes-USpawnArea`}
								onScreen={onScreen_Classes}
							>
								Spawn Area
							</SidebarHashLink>
						</li>
					</ul>
				</li>
			</ul>
		</Sidebar>
	);

	return (
		<>
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
							TODO: I wrote this article with the goal that the reader doesn&#39;t need to understand C++
							to grasp the main concepts that BeatShot uses in its target spawning system.
						</p>
					</article>
				</div>
			</div>
		</>
	);
};

export { SpawningTargetsWithoutIntersection, titleShort, titleLong, description };
