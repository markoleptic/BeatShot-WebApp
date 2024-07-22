"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import gameplayAbilitySystemBlogPostData from "@/components/blog/GameplayAbilitySystemData";
import SpawningWithoutBlogPostData from "@/components/blog/SpawningWithoutIntersectionData";
import targetSpawningSystemBlogPostData from "@/components/blog/TargetSpawningSystemData";
import targetSpawningSystemPart2BlogPostData from "@/components/blog/TargetSpawningSystemDataPart2";

import "@/styles/Card.scss";
import "@/styles/Hero.scss";

const BlogPostsMain = () => {
	return (
		<div className="flex-container-column">
			<div className="hero-container">
				<div className="hero">
					<h1>BeatShot Developer Blog</h1>
				</div>
			</div>
			<div className="flex-container-row padding-1rem gap-1rem flex-wrap">
				<Link className="card-container" href="/devblog/spawning-without-intersection">
					<div className="card">
						<p className="sub-heading">
							Article
							<time dateTime={SpawningWithoutBlogPostData.postDate.toHTTP() as string}>
								{SpawningWithoutBlogPostData.postDate.toFormat("DD")}{" "}
							</time>
						</p>
						<Image src={SpawningWithoutBlogPostData.cardImage} alt="Spawning-without-intersection-teaser" />
						<div className="card-label">{SpawningWithoutBlogPostData.titleLong}</div>
						<div className="flex-container" />
						<p className="card-sub-label">{SpawningWithoutBlogPostData.description}</p>
					</div>
				</Link>
				<Link className="card-container" href="/devblog/target-spawning-system-part-2">
					<div className="card">
						<p className="sub-heading">
							Article
							<time dateTime={targetSpawningSystemPart2BlogPostData.postDate.toHTTP() as string}>
								{targetSpawningSystemPart2BlogPostData.postDate.toFormat("DD")}
							</time>
						</p>
						<Image
							src={targetSpawningSystemPart2BlogPostData.cardImage}
							alt="TargetSpawningSystem-teaser"
						/>
						<div className="card-label">{targetSpawningSystemPart2BlogPostData.titleLong}</div>
						<div className="flex-container" />
						<p className="card-sub-label">{targetSpawningSystemPart2BlogPostData.description}</p>
					</div>
				</Link>
				<Link className="card-container" href="/devblog/gameplay-ability-system-overview">
					<div className="card">
						<p className="sub-heading">
							Article
							<time dateTime={gameplayAbilitySystemBlogPostData.postDate.toHTTP() as string}>
								{gameplayAbilitySystemBlogPostData.postDate.toFormat("DD")}
							</time>
						</p>
						<Image src={gameplayAbilitySystemBlogPostData.cardImage} alt="TargetSpawningSystem-teaser" />
						<div className="card-label">{gameplayAbilitySystemBlogPostData.titleLong}</div>
						<div className="flex-container" />
						<p className="card-sub-label">{gameplayAbilitySystemBlogPostData.description}</p>
					</div>
				</Link>
				<Link className="card-container" href="/devblog/target-spawning-system">
					<div className="card">
						<p className="sub-heading">
							Article
							<time dateTime={targetSpawningSystemBlogPostData.postDate.toHTTP() as string}>
								{targetSpawningSystemBlogPostData.postDate.toFormat("DD")}
							</time>
						</p>
						<Image src={targetSpawningSystemBlogPostData.cardImage} alt="TargetSpawningSystem-teaser" />
						<div className="card-label">{targetSpawningSystemBlogPostData.titleLong}</div>
						<div className="flex-container" />
						<p className="card-sub-label">{targetSpawningSystemBlogPostData.description}</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default BlogPostsMain;
