"use client";

import React, { useState } from "react";

import Image, { StaticImageData } from "next/image";

import "@/styles/Article.scss";
import "@/styles/ImageCarousel.scss";

type ImageData = {
	image: StaticImageData;
	alt: string;
	figNumber: number;
	caption?: string;
	buttonText?: string;
};

type ImageSliderProps = {
	images: ImageData[];
	imageClassName?: string;
};

const DualImageCarousel = ({ images, imageClassName = "" }: ImageSliderProps): React.JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleFirst = () => {
		setCurrentIndex(0);
		//setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handleSecond = () => {
		setCurrentIndex(1);
		//setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	return (
		<figure className="figure-border-container">
			<Image className={imageClassName} src={images[currentIndex].image} alt={images[currentIndex].alt} />
			<figcaption>
				<p className="figlabel">
					Figure {images[currentIndex].figNumber}
					{images[currentIndex].caption === undefined ? "" : ": "}
				</p>
				{images[currentIndex].caption}
			</figcaption>
			<div className="button-container">
				<button
					className={currentIndex == 0 ? "active" : ""}
					onClick={handleFirst}
					disabled={images.length <= 1}
				>
					{images.length >= 1 ? images[0].buttonText : "1"}
				</button>
				<button
					className={currentIndex == 1 ? "active" : ""}
					onClick={handleSecond}
					disabled={images.length <= 1}
				>
					{images.length >= 1 ? images[1].buttonText : "2"}
				</button>
			</div>
		</figure>
	);
};

const MultiImageCarousel = ({ images, imageClassName = "" }: ImageSliderProps): React.JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => prevIndex - 1);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
	};

	return (
		<figure className="figure-border-container">
			<Image className={imageClassName} src={images[currentIndex].image} alt={images[currentIndex].alt} />
			<figcaption>
				<p className="figlabel">
					Figure {images[currentIndex].figNumber}
					{images[currentIndex].caption === undefined ? "" : ": "}
				</p>
				{images[currentIndex].caption}
			</figcaption>
			<div className="button-container">
				<button onClick={handlePrev} disabled={images.length <= 1 || currentIndex == 0}>
					{"Previous"}
				</button>
				<button onClick={handleNext} disabled={images.length <= 1 || currentIndex == images.length - 1}>
					{"Next"}
				</button>
			</div>
		</figure>
	);
};

export { DualImageCarousel, MultiImageCarousel };
