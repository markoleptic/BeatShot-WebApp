"use client";
import React from "react";

type BlueprintGraphProps = {
  bpLink: string;
  label: string;
  description: any;
};

export const BlueprintGraph = ({ bpLink, label, description }: BlueprintGraphProps) => {
  return (
    <div className="blueprint-container">
      <iframe className="blueprint" src={bpLink} scrolling="no" allowFullScreen></iframe>
      <figcaption>
        <p className="figlabel">{label + ": "}</p>
        {description}
      </figcaption>
    </div>
  );
};
