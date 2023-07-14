"use client";
import React from "react";
import YouTube from "react-youtube";

// eslint-disable-next-line @next/next/no-async-client-component
const Video = async () => {
  return (
      <YouTube className="video" videoId="nVDfVseH24g" loading="lazy" iframeClassName="responsive-iframe"/>
  );
};

export default Video;