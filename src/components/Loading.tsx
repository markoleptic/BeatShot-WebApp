"use client";
import React, { useEffect, useState } from "react";

const Loading = (): React.JSX.Element => {
	const [currentLoadingText, setCurrentLoadingText] = useState("Loading..");

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentLoadingText((prev) => {
				if (prev === "Loading.") {
					return "Loading..";
				} else if (prev === "Loading..") {
					return "Loading...";
				}

				return "Loading.";
			});
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="loading-container">
				<h2 className="loading-text">{currentLoadingText}</h2>
			</div>
		</>
	);
};

export default Loading;
