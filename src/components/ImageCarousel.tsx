"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import "@/styles/ImageCarousel.scss";
import "@/styles/Article.scss";

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

const DualImageCarousel: React.FC<ImageSliderProps> = ({ images, imageClassName = "" }) => {
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
		<figure>
			<div className="figure-border-container">
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
			</div>
		</figure>
	);
};

const MultiImageCarousel: React.FC<ImageSliderProps> = ({ images, imageClassName = "" }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => prevIndex - 1);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
	};

	return (
		<figure>
			<div className="figure-border-container ">
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
			</div>
		</figure>
	);
};

export { DualImageCarousel, MultiImageCarousel };
