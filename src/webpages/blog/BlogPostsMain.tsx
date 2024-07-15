"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { blogPostData as targetSpawningSystemBlogPostData } from "@/pages/blog/TargetSpawningSystem";
import { blogPostData as gameplayAbilitySystemBlogPostData } from "@/webpages/blog/GameplayAbilitySystem";
import { blogPostData as targetSpawningSystemPart2BlogPostData } from "@/pages/blog/TargetSpawningSystemPart2";
import { blogPostData as targetSpawningSystemPart3BlogPostData } from "@/pages/blog/TargetSpawningSystemPart3";
import { blogPostData as SpawningWithoutBlogPostData } from "@/pages/blog/SpawningWithoutIntersection";

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
									<time dateTime={targetSpawningSystemBlogPostData.postDate.toHTTP() as string}>
										{targetSpawningSystemBlogPostData.postDate.toFormat("DD")}
									</time>
								</p>
								<Image
									src={targetSpawningSystemBlogPostData.cardImage}
									alt="TargetSpawningSystem-teaser"
								/>
								<div className="card-label">{targetSpawningSystemBlogPostData.titleLong}</div>
								<p className="card-sub-label">{targetSpawningSystemBlogPostData.description}</p>
							</div>
						</Link>
					</div>
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/gameplay-ability-system-overview">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime={gameplayAbilitySystemBlogPostData.postDate.toHTTP() as string}>
										{gameplayAbilitySystemBlogPostData.postDate.toFormat("DD")}
									</time>
								</p>
								<Image
									src={gameplayAbilitySystemBlogPostData.cardImage}
									alt="TargetSpawningSystem-teaser"
								/>
								<div className="card-label">{gameplayAbilitySystemBlogPostData.titleLong}</div>
								<p className="card-sub-label">{gameplayAbilitySystemBlogPostData.description}</p>
							</div>
						</Link>
					</div>
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/target-spawning-system-part-2">
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
								<p className="card-sub-label">{targetSpawningSystemPart2BlogPostData.description}</p>
							</div>
						</Link>
					</div>
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/target-spawning-system-part-3">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime={targetSpawningSystemPart3BlogPostData.postDate.toHTTP() as string}>
										{targetSpawningSystemPart3BlogPostData.postDate.toFormat("DD")}
									</time>
								</p>
								<Image
									src={targetSpawningSystemPart3BlogPostData.cardImage}
									alt="TargetSpawningSystem-teaser"
								/>
								<div className="card-label">{targetSpawningSystemPart3BlogPostData.titleLong}</div>
								<p className="card-sub-label">{targetSpawningSystemPart3BlogPostData.description}</p>
							</div>
						</Link>
					</div>
					<div className="card-container gap-1rem padding-1rem">
						<Link className="link" href="/devblog/spawning-without-intersection">
							<div className="card">
								<p className="sub-heading">
									Article
									<time dateTime={SpawningWithoutBlogPostData.postDate.toHTTP() as string}>
										{SpawningWithoutBlogPostData.postDate.toFormat("DD")}{" "}
									</time>
								</p>
								<Image
									src={SpawningWithoutBlogPostData.cardImage}
									alt="Spawning-without-intersection-teaser"
								/>
								<div className="card-label">{SpawningWithoutBlogPostData.titleLong}</div>
								<p className="card-sub-label">{SpawningWithoutBlogPostData.description}</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPostsMain;
