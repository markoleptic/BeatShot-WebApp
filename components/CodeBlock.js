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
  flexshrink: 1,
  display: "flex",
  overflowX: "scroll",
  fontFamily: "inherit",
  padding: "0.25rem",
  borderRadius: "0.25rem",
  fontSize: "inherit",
  lineHeight: "inherit",
  width: "100%",
};

let regularTheme = Object.assign({}, dracula);
regularTheme.backgroundColor = backGroundColor;

const BSCodeBlock = ({ code, language, showLineNumbers, fontSize = "inherit", maxHeight = "inherit", lineHeight = "inherit" }) => {
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
            language={"csharp"}
            showLineNumbers={showLineNumbers || false}
            theme={regularTheme}
            wrapLines={true}
            codeBlockStyle={codeBlockStyle}
            codeContainerStyle={codeContainerStyle}
          />
        </div>
      </div>
    </div>
  );
};

const BSInlineCodeBlock = ({
  code,
  language,
  showLineNumbers,
  fontSize = "inherit",
  lineHeight = "inherit",
  padding = "0rem",
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
        display: "inline",
        overflowY: "clip",
        overflowWrap: "anywhere",
        fontSize: fontSize,
        lineHeight: lineHeight,
        padding: padding,
        color: color,
      }}
      wrapLines={true}
    />
  );
};

let inlineTheme = Object.assign({}, dracula);
inlineTheme.backgroundColor = "transparent";
const BSInlineFunction = ({
  className = "",
  functionName = "",
  language = "c",
  showLineNumbers = false,
  fontSize = "inherit",
  lineHeight = "inherit",
}) => {
  inlineCodeBlockStyle.lineHeight = lineHeight;
  return (
    <span className="inline-code-bg">
      {className.length === 0 ? (
        <></>
      ) : (
        <>
          <CodeBlock
            customStyle={{
              display: "inline",
              overflowY: "clip",
              overflowWrap: "anywhere",
              whiteSpace: "inherit",
              fontSize: fontSize,
              lineHeight: lineHeight,
              borderRadius: "3px 0 0 3px",
              padding: "0 0 0 0.1em",
              color: "inherit",
            }}
            text={className}
            language={language}
            showLineNumbers={showLineNumbers}
            theme={inlineTheme}
            codeBlockStyle={inlineCodeBlockStyle}
            codeContainerStyle={inlineCodeBlockStyle}
            wrapLines={true}
          />
          {functionName.length === 0 || className.length === 0 ? (
            <></>
          ) : (
            <CodeBlock
              customStyle={{
                display: "inline",
                overflowY: "clip",
                overflowWrap: "anywhere",
                whiteSpace: "inherit",
                fontSize: fontSize,
                lineHeight: lineHeight,
                borderRadius: "0",
                padding: "0",
                color: "white",
              }}
              text={"::"}
              language={language}
              showLineNumbers={showLineNumbers}
              theme={inlineTheme}
              codeBlockStyle={inlineCodeBlockStyle}
              codeContainerStyle={inlineCodeBlockStyle}
              wrapLines={true}
            />
          )}
        </>
      )}
      {functionName.length === 0 ? (
        <></>
      ) : (
        <>
          <CodeBlock
            customStyle={{
              display: "inline",
              overflowY: "clip",
              overflowWrap: "anywhere",
              whiteSpace: "inherit",
              fontSize: fontSize,
              lineHeight: lineHeight,
              borderRadius: "0 3px 3px 0",
              padding: "0 0.1em 0 0",
              color: "rgb(80, 250, 123)",
            }}
            text={functionName}
            language={language}
            showLineNumbers={showLineNumbers}
            theme={inlineTheme}
            codeBlockStyle={inlineCodeBlockStyle}
            codeContainerStyle={inlineCodeBlockStyle}
            wrapLines={true}
          />
        </>
      )}
    </span>
  );
};

const BSInlineEnum = ({ className, valueName, language = "c", showLineNumbers = false, fontSize = "inherit", lineHeight = "inherit" }) => {
  inlineCodeBlockStyle.lineHeight = lineHeight;
  return (
    <span className="inline-code-bg">
      <CodeBlock
        customStyle={{
          display: "inline",
          overflowY: "clip",
          overflowWrap: "anywhere",
          whiteSpace: "inherit",
          fontSize: fontSize,
          lineHeight: lineHeight,
          borderRadius: "3px 0 0 3px",
          padding: "0 0 0 0.1em",
          color: "inherit",
        }}
        text={className}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={inlineTheme}
        codeBlockStyle={inlineCodeBlockStyle}
        codeContainerStyle={inlineCodeBlockStyle}
        wrapLines={true}
      />
      <CodeBlock
        customStyle={{
          display: "inline",
          overflowY: "clip",
          overflowWrap: "anywhere",
          whiteSpace: "inherit",
          fontSize: fontSize,
          lineHeight: lineHeight,
          borderRadius: "0",
          padding: "0",
          color: "white",
        }}
        text={"::"}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={inlineTheme}
        codeBlockStyle={inlineCodeBlockStyle}
        codeContainerStyle={inlineCodeBlockStyle}
        wrapLines={true}
      />
      <CodeBlock
        customStyle={{
          display: "inline",
          overflowY: "clip",
          overflowWrap: "anywhere",
          whiteSpace: "inherit",
          fontSize: fontSize,
          lineHeight: lineHeight,
          borderRadius: "0 3px 3px 0",
          padding: "0 0.1em 0 0",
          color: "rgb(241, 250, 140)",
        }}
        text={valueName}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={inlineTheme}
        codeBlockStyle={inlineCodeBlockStyle}
        codeContainerStyle={inlineCodeBlockStyle}
        wrapLines={true}
      />
    </span>
  );
};

export { BSCodeBlock, BSInlineCodeBlock, BSInlineEnum, BSInlineFunction };
