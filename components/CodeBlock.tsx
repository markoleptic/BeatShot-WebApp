import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
const backGroundColor = "#1E1E1E";

const codeBlockStyle = {
	overflowX: "scroll",
	overflowY: "scroll",
	lineHeight: "inherit",
	width: "100%",
};

const inlineCodeBlockStyle = {
	display: "inline",
	fontSize: "inherit",
	fontFamily: "inherit",
	padding: "0px",
	lineHeight: "inherit",
	whiteSpace: "normal",
};

const codeContainerStyle = {
	overflowX: "scroll",
	overflowY: "scroll",
	lineHeight: "inherit",
	width: "100%",
};

const customStyle = {
	flexshrink: "1",
	display: "flex",
	overflowX: "scroll",
	fontFamily: "inherit",
	padding: "0.25rem",
	borderRadius: "0.25rem",
	fontSize: "inherit",
	lineHeight: "inherit",
	width: "100%",
};

export interface BSCodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	fontSize?: string;
	maxHeight?: string;
	lineHeight?: string;
	padding?: string;
	color?: string;
}

let regularTheme = Object.assign({}, dracula);
regularTheme.backgroundColor = backGroundColor;

export const BSCodeBlock: React.FC<BSCodeBlockProps> = ({
	code,
	language = "csharp",
	showLineNumbers = false,
	fontSize = "inherit",
	lineHeight = "inherit",
}) => {
	customStyle.fontSize = fontSize;
	customStyle.lineHeight = lineHeight;
	codeBlockStyle.lineHeight = lineHeight;
	codeContainerStyle.lineHeight = lineHeight;
	return (
		<div className="code-border-container">
			<div className="code-border">
				<div className="codeblock-container">
					<CodeBlock
						customStyle={customStyle}
						text={code}
						language={language}
						showLineNumbers={showLineNumbers}
						theme={regularTheme}
						wrapLongLines={false}
						codeBlockStyle={codeBlockStyle}
						codeContainerStyle={codeContainerStyle}
					/>
				</div>
			</div>
		</div>
	);
};

export const BSInlineCodeBlock: React.FC<BSCodeBlockProps> = ({
	code,
	language = "c",
	showLineNumbers = false,
	fontSize = "inherit",
	lineHeight = "inherit",
	padding = "0rem",
	color = "inherit",
}) => {
	inlineCodeBlockStyle.lineHeight = lineHeight;
	return (
		<CodeBlock
			text={code}
			language={language}
			showLineNumbers={showLineNumbers}
			theme={regularTheme}
			codeBlockStyle={inlineCodeBlockStyle}
			codeContainerStyle={inlineCodeBlockStyle}
			customStyle={{
				display: "inline",
				overflowY: "clip",
				overflowWrap: "anywhere",
				fontSize: fontSize,
				lineHeight: lineHeight,
				padding: padding,
				color: color,
			}}
			wrapLongLines={false}
		/>
	);
};

export const BSInlineCodeBlockHeader: React.FC<BSCodeBlockProps> = ({
	code,
	language,
	showLineNumbers,
	fontSize = "inherit",
	lineHeight = "inherit",
	padding = "0 0.1em",
	color = "inherit",
}) => {
	inlineCodeBlockStyle.lineHeight = lineHeight;
	return (
		<CodeBlock
			text={code}
			language={language || "c"}
			showLineNumbers={showLineNumbers || false}
			theme={regularTheme}
			codeBlockStyle={inlineCodeBlockStyle}
			codeContainerStyle={inlineCodeBlockStyle}
			customStyle={{
				display: "flex",
				overflowY: "clip",
				overflowWrap: "anywhere",
				fontSize: fontSize,
				lineHeight: lineHeight,
				padding: padding,
				color: color,
			}}
			wrapLongLines={false}
		/>
	);
};

let inlineTheme = Object.assign({}, dracula);
inlineTheme.backgroundColor = "transparent";

export const BSInlineFunction: React.FC<{
	className?: string;
	functionName?: string;
}> = ({ className = "", functionName = "" }) => {
	if (className === "") {
		return <span className={`inline-code function-color`}>{functionName}</span>;
	} else if (functionName === "") {
		return <span className={`inline-code`}>{className}</span>;
	} else {
		return (
			<>
				<span className={`inline-code class`}>{className}</span>
				<span className="inline-code separator text-white">{"::"}</span>
				<span className="inline-code function function-color">{functionName}</span>
			</>
		);
	}
};

export const BSInlineEnum: React.FC<{
	className?: string;
	valueName?: string;
}> = ({ className = "", valueName = "" }) => {
	if (className.length === 0) {
		return <span className={`inline-code function-color`}>{valueName}</span>;
	} else if (valueName.length === 0) {
		return <span className={`inline-code`}>{className}</span>;
	} else {
		return (
			<>
				<span className={`inline-code`}>
					{className}
					{<span className="text-white">{"::"}</span>}
					{<span className="enum-color">{valueName}</span>}
				</span>
			</>
		);
	}
};
