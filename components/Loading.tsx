'use client';
import React, { useState } from "react";

export default function Loading() {
  const [currentLoadingText, setCurrentLoadingText] = useState("Loading..");
  
  setInterval(function () {
    if (currentLoadingText === 'Loading.') {
        setCurrentLoadingText('Loading..');
    }
    else if (currentLoadingText === 'Loading..') {
        setCurrentLoadingText('Loading...');
    }
    else {
        setCurrentLoadingText('Loading.');
    }
  }, 500);

  return (
    <>
      <div className="loading-container">
        <h2 className="loading-text">{currentLoadingText}</h2>
      </div>
    </>
  );
}
