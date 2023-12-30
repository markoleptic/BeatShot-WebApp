"use client";
import React from "react";
import { BSInlineCodeBlock, BSInlineCodeBlockHeader } from "@/components/CodeBlock";
import Link from "next/link";

const getBaseClassText = (baseClass: string, headingLevel: number) => {
	if (baseClass.length === 0) {
		return <></>;
	}
	let fontSize =
		headingLevel == 1
			? "fs-400"
			: headingLevel == 2
				? "fs-300"
				: headingLevel == 3
					? "fs-200"
					: headingLevel == 4
						? "fs-100"
						: "fs-200";
	return (
		<>
			<h4 className="align-self-center fs-100"> inherits from </h4>
			<h4 className={"inline-code-header " + fontSize}>
				<BSInlineCodeBlock code={baseClass} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />
			</h4>
		</>
	);
};

const getComponentOfText = (compOf: string, compOfText: string, headingLevel: number) => {
	if (compOf.length === 0) {
		return <></>;
	}
	let fontSize =
		headingLevel == 1
			? "fs-400"
			: headingLevel == 2
				? "fs-300"
				: headingLevel == 3
					? "fs-200"
					: headingLevel == 4
						? "fs-100"
						: "fs-200";
	return (
		<>
			<h4 className="align-self-center fs-400"> | </h4>
			<h4 className="align-self-center fs-100">{compOfText}</h4>
			<h4 className={"inline-code-header " + fontSize}>
				<BSInlineCodeBlock code={compOf} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />
			</h4>
		</>
	);
};

const getChildClassText = (
	headingLevel: number,
	childClass: string,
	childClassLink: string,
	childClassColor: string
) => {
	if (headingLevel === 0) {
		return <></>;
	}
	if (headingLevel === 1) {
		return (
			<>
				<h1 className="inline-code-header">{getCodeBlock(childClass, childClassLink, childClassColor)}</h1>
			</>
		);
	}
	if (headingLevel === 2) {
		return (
			<>
				<h2 className="inline-code-header">{getCodeBlock(childClass, childClassLink, childClassColor)}</h2>
			</>
		);
	}
	if (headingLevel === 3) {
		return (
			<>
				<h3 className="inline-code-header">{getCodeBlock(childClass, childClassLink, childClassColor)}</h3>
			</>
		);
	}
	return (
		<>
			<h4 className="inline-code-header">{getCodeBlock(childClass, childClassLink, childClassColor)}</h4>
		</>
	);
};

const getCodeBlock = (childClass: string, childClassLink: string, childClassColor: string) => {
	if (childClassLink.length === 0) {
		return (
			<BSInlineCodeBlockHeader
				color={childClassColor}
				code={childClass}
				padding={"0 0.1em"}
				language={"c"}
				showLineNumbers={false}
			/>
		);
	}
	return (
		<Link className="link inherit-color hover-white" href={childClassLink}>
			<BSInlineCodeBlockHeader
				color={childClassColor}
				code={childClass}
				padding={"0 0.1em"}
				language={"c"}
				showLineNumbers={false}
			/>
		</Link>
	);
};

type BlogHeadingClassProps = {
	childClass: string;
	baseClass?: string;
	headingLevel: number;
	compOf?: string;
	compOfText?: string;
	childClassLink?: string;
	childClassColor?: string;
};

const BlogHeadingClass = ({
	childClass,
	baseClass = "",
	headingLevel,
	compOf = "",
	compOfText = "component of ",
	childClassLink = "",
	childClassColor = "inherit",
}: BlogHeadingClassProps) => {
	return (
		<div className="article-heading">
			<div className="line-top"></div>
			<div className="article-heading-content ">
				{getChildClassText(headingLevel, childClass, childClassLink, childClassColor)}
				{getBaseClassText(baseClass, headingLevel - 1)}
				{getComponentOfText(compOf, compOfText, headingLevel - 1)}
			</div>
			<div className="line-bottom"></div>
		</div>
	);
};

type BlogHeadingProps = {
	headingText: string;
	headingLevel: number;
	color?: string;
};

const getHeadingText = (headingText: string, headingLevel: number, color: string) => {
	if (headingLevel === 0) {
		return <></>;
	}
	if (headingLevel === 1) {
		return <h1 className={color}>{headingText}</h1>;
	}
	if (headingLevel === 2) {
		return <h2 className={color}>{headingText}</h2>;
	}
	if (headingLevel === 3) {
		return <h3 className={color}>{headingText}</h3>;
	}
	if (headingLevel === 4) {
		return <h4 className={color}>{headingText}</h4>;
	}
	if (headingLevel === 5) {
		return <h5 className={color}>{headingText}</h5>;
	}
	if (headingLevel === 6) {
		return <h6 className={color}>{headingText}</h6>;
	}
};

const BlogHeading = ({ headingText, headingLevel, color = "text-light" }: BlogHeadingProps) => {
	return (
		<div className="article-heading">
			<span className="line-top" />
			{getHeadingText(headingText, headingLevel, color)}
			<span className="line-bottom" />
		</div>
	);
};

export { BlogHeadingClass, BlogHeading };
