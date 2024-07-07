import React from "react";
import { CodeBlock, dracula, github, vs2015 } from "react-code-blocks";
const backGroundColor = "#1E1E1E";
import "@/styles/Codeblock.scss";

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

type BSCodeBlockProps = {
	children?: string;
	fontSize?: string;
};

const theme = {
	lineNumberColor: `#6272a4`,
	lineNumberBgColor: `#1E1E1E`,
	backgroundColor: `#1E1E1E`,
	textColor: `#f8f8f2`,
	substringColor: `#f1fa8c`,
	keywordColor: `#499cd5`,
	attributeColor: `#39c8b0`,
	selectorTagColor: `#8be9fd`,
	docTagColor: `#f1fa8c`,
	nameColor: `#66d9ef`,
	builtInColor: `#499cd5`,
	literalColor: `#499cd5`,
	bulletColor: `#8BE9FD`,
	codeColor: `#39c8b0`,
	additionColor: `#f1fa8c`,
	regexpColor: `#F1FA8C`,
	symbolColor: `#F1FA8C`,
	variableColor: `#F8F8F2`,
	templateVariableColor: `#39c8b0`,
	linkColor: `#00bcd4`,
	selectorAttributeColor: `#39c8b0`,
	selectorPseudoColor: `#39c8b0`,
	typeColor: `#39c8b0`,
	stringColor: `#cd9069`,
	selectorIdColor: `#39c8b0`,
	selectorClassColor: `#39c8b0`,
	quoteColor: `#E9F284`,
	templateTagColor: `#39c8b0`,
	deletionColor: `#39c8b0`,
	titleColor: `#ff555580`,
	sectionColor: `#F8F8F2`,
	commentColor: `#6272A4`,
	metaKeywordColor: `#39c8b0`,
	metaColor: `#39c8b0`,
	functionColor: `#dcdcaa`,
	numberColor: `#bd93f9`,
};

export const BSCodeBlock: React.FC<BSCodeBlockProps> = ({ children, fontSize = "0.65rem" }) => {
	customStyle.fontSize = fontSize;
	customStyle.lineHeight = "inherit";
	codeBlockStyle.lineHeight = "inherit";
	codeContainerStyle.lineHeight = "inherit";
	return (
		<div className="code-border-container">
			<div className="code-border">
				<div className="codeblock-container">
					<CodeBlock
						customStyle={customStyle}
						text={children}
						language={"cpp"}
						showLineNumbers={false}
						theme={theme}
						wrapLongLines={false}
						codeBlockStyle={codeBlockStyle}
						codeContainerStyle={codeContainerStyle}
					/>
				</div>
			</div>
		</div>
	);
};

type BSInlineCodeBlockProps = {
	code?: string;
	language?: string;
	showLineNumbers?: boolean;
	fontSize?: string;
	lineHeight?: string;
	padding?: string;
	color?: string;
};
export const BSInlineCodeBlock: React.FC<BSInlineCodeBlockProps> = ({
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
			theme={theme}
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

export const BSInlineCodeBlockHeader: React.FC<BSInlineCodeBlockProps> = ({
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
			theme={theme}
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

export const BSInlineFunction: React.FC<{ children?: string }> = ({ children }) => {
	if (!children) {
		return <span className="inline-code">{children}</span>;
	}

	const parts = children.split("::");

	if (parts.length === 2) {
		const [className, functionName] = parts;

		if (className && !functionName) {
			return <span className="inline-code class-color">{className}</span>;
		} else if (!className && functionName) {
			return <span className="inline-code function-color">{functionName}</span>;
		} else {
			return (
				<>
					<span className="inline-code class class-color">{className}</span>
					<span className="inline-code separator scope-res-operator-color">{"::"}</span>
					<span className="inline-code function function-color">{functionName}</span>
				</>
			);
		}
	}

	return <span className="inline-code">{children}</span>;
};

export const BSInlineEnum: React.FC<{ children?: string }> = ({ children }) => {
	if (!children) {
		return <span className="inline-code">{children}</span>;
	}

	const parts = children.split("::");

	if (parts.length === 2) {
		const [className, enumValue] = parts;

		if (className && !enumValue) {
			return <span className={`inline-code class-color`}>{className}</span>;
		} else if (!className && enumValue) {
			return <span className={`inline-code enum-color`}>{enumValue}</span>;
		} else {
			return (
				<>
					<span className="inline-code class class-color">{className}</span>
					<span className="inline-code separator scope-res-operator-color">{"::"}</span>
					<span className="inline-code enum enum-color">{enumValue}</span>
				</>
			);
		}
	}

	return <span className="inline-code">{children}</span>;
};
