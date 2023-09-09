"use client";
import React from "react";
import { BSInlineCodeBlock } from "@/components/CodeBlock";
import Link from "next/link";

const getComponentOfText = (compOf: string, compOfText: string) => {
  if (compOf.length === 0) {
    return <></>;
  }
  return (
    <>
      <h4 className="inline fs-400"> | </h4>
      <h4 className="inline">{compOfText}</h4>
      <h4 className="inline-code-header">
        <BSInlineCodeBlock code={compOf} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />
      </h4>
    </>
  );
};

const getChildClassText = (headingLevel: number, childClass: string, childClassLink: string) => {
  if (headingLevel === 0) {
    return <></>;
  }
  if (headingLevel === 1) {
    return (
      <>
        <h1 className="inline-code-header">{getCodeBlock(childClass, childClassLink)}</h1>
      </>
    );
  }
  if (headingLevel === 2) {
    return (
      <>
        <h2 className="inline-code-header">{getCodeBlock(childClass, childClassLink)}</h2>
      </>
    );
  }
  if (headingLevel === 3) {
    return (
      <>
        <h3 className="inline-code-header">{getCodeBlock(childClass, childClassLink)}</h3>
      </>
    );
  }
  return (
    <>
      <h4 className="inline-code-header">{getCodeBlock(childClass, childClassLink)}</h4>
    </>
  );
};

const getCodeBlock = (childClass: string, childClassLink: string) => {
  if (childClassLink.length === 0) {
    return <BSInlineCodeBlock code={childClass} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />;
  }
  return (
    <Link className= "link inherit-color hover-white" href={childClassLink}>
      <BSInlineCodeBlock code={childClass} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />
    </Link>
  );
};

type BlogHeadingClassProps = {
  baseClass: string;
  childClass: string;
  headingLevel: number;
  compOf?: string;
  compOfText?: string;
  childClassLink?: string;
};

type BlogHeadingProps = {
  headingText: string;
  headingLevel: number;
  color?: string;
};

const BlogHeadingClass = ({
  baseClass,
  childClass,
  headingLevel,
  compOf = "",
  compOfText = "component of ",
  childClassLink = "",
}: BlogHeadingClassProps) => {
  return (
    <div className="article-heading">
      <span className="line-top" />
      <div className="inline">
        {getChildClassText(headingLevel, childClass, childClassLink)}
        <h4 className="inline vert-align-middle"> inherits from </h4>
        <h4 className="inline-code-header">
          <BSInlineCodeBlock code={baseClass} padding={"0 0.1em"} language={"c"} showLineNumbers={false} />
        </h4>
        {getComponentOfText(compOf, compOfText)}
      </div>
      <span className="line-bottom" />
    </div>
  );
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
