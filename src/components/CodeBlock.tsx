import React, { HTMLAttributes } from "react";

import "@/styles/Codeblock.scss";

import { CodeBlock } from "react-code-blocks";

const codeBlockStyle = {
	overflowX: "scroll",
	overflowY: "scroll",
	lineHeight: "inherit",
	//width: "100%",
};

const codeContainerStyle = {
	overflowX: "scroll",
	overflowY: "scroll",
	lineHeight: "inherit",
	width: "100%",
};

const customStyle = {
	display: "flex",
	overflowX: "scroll",
	fontFamily: "inherit",
	padding: "0.25rem",
	borderRadius: "0.25rem",
	fontSize: "inherit",
	lineHeight: "inherit",
	//width: "100%",
};

type BSCodeBlockProps = HTMLAttributes<HTMLElement> & {
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

const BSCodeBlock = ({ children, fontSize = "0.65rem", ...rest }: BSCodeBlockProps): React.JSX.Element => {
	customStyle.fontSize = fontSize;
	customStyle.lineHeight = "inherit";
	codeBlockStyle.lineHeight = "inherit";
	codeContainerStyle.lineHeight = "inherit";
	return (
		<div className="code-border-container" {...rest}>
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

export enum InlineCodeType {
	Any,
	Function,
	Enum,
}

type BSInlineCodeProps = {
	children?: string;
	inlineCodeType?: InlineCodeType;
	link?: boolean;
};

const BSInlineCode = ({
	children,
	inlineCodeType = InlineCodeType.Any,
	link = false,
}: BSInlineCodeProps): React.JSX.Element => {
	if (!children) {
		return <span className="inline-code">{children}</span>;
	}

	const parts = children.split("::");

	const linkStyleName = link ? " hover-white" : "";

	if (parts.length === 2) {
		const [className, inlineCodeTypeName] = parts;
		const inlineCodeTypeColorStyleName =
			inlineCodeType === InlineCodeType.Function ? "function-color" : "enum-color";
		const inlineCodeTypeStyleName = inlineCodeType === InlineCodeType.Function ? "function" : "enum";

		if (className && inlineCodeTypeName) {
			return (
				<>
					<span className={`inline-code class class-color${linkStyleName}`}>{className}</span>
					<span className={`inline-code separator scope-res-operator-color`}>{"::"}</span>
					<span
						className={`inline-code ${inlineCodeTypeStyleName} ${inlineCodeTypeColorStyleName}${linkStyleName}`}
					>
						{inlineCodeTypeName}
					</span>
				</>
			);
		} else if (className && !inlineCodeTypeName) {
			return <span className={`inline-code class-color${linkStyleName}`}>{className}</span>;
		} else if (!className && inlineCodeTypeName) {
			return (
				<span
					className={`inline-code ${inlineCodeTypeStyleName} ${inlineCodeTypeColorStyleName}${linkStyleName}`}
				>
					{inlineCodeTypeName}
				</span>
			);
		}
	}

	return <span className={`inline-code class-color${linkStyleName}`}>{children}</span>;
};

const BSInlineFunction = ({ children }: BSCodeBlockProps): React.JSX.Element => {
	return <BSInlineCode inlineCodeType={InlineCodeType.Function}>{children}</BSInlineCode>;
};

const BSInlineEnum = ({ children }: BSCodeBlockProps): React.JSX.Element => {
	return <BSInlineCode inlineCodeType={InlineCodeType.Enum}>{children}</BSInlineCode>;
};

export { BSCodeBlock, BSInlineCode, BSInlineFunction, BSInlineEnum };
