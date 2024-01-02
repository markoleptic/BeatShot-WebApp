"use client";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// eslint-disable-next-line @next/next/no-async-client-component
const Video = () => {
	return (
		<div className="video">
			<LiteYouTubeEmbed aspectHeight={9} aspectWidth={16} id="nVDfVseH24g" title={"BeatShot Trailer"} iframeClass="responsive-iframe" poster={"maxresdefault"} />
		</div>
	);
};

export default Video;
