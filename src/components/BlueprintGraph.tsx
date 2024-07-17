"use client";
import React from "react";

type BlueprintGraphProps = {
	bpLink: string;
	label: string;
	description: any;
	id?: string;
};

const BlueprintGraph = ({ bpLink, label, description, id = "" }: BlueprintGraphProps): React.JSX.Element => {
	return (
		<div className="blueprint-container" id={id}>
			<iframe className="blueprint" src={bpLink} scrolling="no" allowFullScreen></iframe>
			<figcaption>
				<p className="figlabel">{label + ": "}</p>
				{description}
			</figcaption>
		</div>
	);
};

export default BlueprintGraph;
