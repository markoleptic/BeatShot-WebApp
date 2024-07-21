"use client";

import React, { HTMLAttributes, ReactNode } from "react";

import Image, { StaticImageData } from "next/image";

type FigureProps = HTMLAttributes<HTMLElement> & {
	image: StaticImageData;
	figNumber: number;
	figCaption: string | ReactNode;
	alt?: string;
	limitMaxWidth?: boolean;
	imageClassName?: string;
};

const Figure = ({
	image,
	figNumber,
	figCaption,
	alt = "",
	limitMaxWidth = false,
	imageClassName = "",
	...rest
}: FigureProps): React.JSX.Element => {
	return (
		<figure
			{...rest}
			className={`figure-border-container${limitMaxWidth ? " max-width-1000" : ""} ` + rest.className}
		>
			<Image className={imageClassName} src={image} alt={alt} />
			<figcaption>
				<p className="figlabel">Figure {figNumber}: </p>
				{figCaption}
			</figcaption>
		</figure>
	);
};

export default Figure;
