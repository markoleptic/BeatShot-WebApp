"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import "@/styles/ImageCarousel.scss";
import "@/styles/Article.scss";

type ImageData = {
	image: StaticImageData;
	alt: string;
	figNumber: number;
	caption: string;
	buttonText: string;
};

type ImageSliderProps = {
	images: ImageData[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
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
				<Image src={images[currentIndex].image} alt={images[currentIndex].alt} />
				<figcaption>
					<p className="figlabel">Figure {images[currentIndex].figNumber}: </p>
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

export default ImageSlider;
