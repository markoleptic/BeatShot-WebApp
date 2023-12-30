"use client";
import { faCrosshairs, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

interface PatchNotesProps {
	children: ReactNode;
	steamlink: URL;
	date: String;
	version: String;
	text: String;
}

function numberOfTabs(text: String): number {
	var count = 0;
	var index = 0;
	while (text.charAt(index++) === "\t") {
		count++;
	}
	return count;
}

const splitLines = (string: String): String[] => string.split(/\r?\n/);

const GetMainContent = (text: String): any => {
	// const split = splitLines(text);
	// for (let item in split) {
	//     var match = numberOfTabs;
	// }
};

const PatchNotesCreator: React.FC<PatchNotesProps> = ({ children, steamlink, date, version, text }) => {
	const content = GetMainContent(text);
	return (
		<div className="centered-bordered-container-1000">
			<div className="pn-container">
				<div className="pn-version-date">
					<Link className="link hover-blue fw-semibold pn-version-number" href={steamlink}>
						{version}
					</Link>
					<p className="pn-date">{date}</p>
				</div>
				<ul>
					<p className="fs-300"></p>
					{content}
					<li>
						<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
						<p className="fs-300">CrossHair</p>
						<ul>
							<li>
								<FontAwesomeIcon icon={faPlay} />
								<p>
									Added the option to show a dot in the middle, along with the color and size. It
									inherits the outline settings.
								</p>
							</li>
							<li>
								<FontAwesomeIcon icon={faPlay} />
								<p>
									Outline Width is now called Outline Size and it now scales independently of Line
									Width.
								</p>
							</li>
						</ul>
					</li>
					<li>
						<FontAwesomeIcon className="fs-300" icon={faCrosshairs} />
						<p className="fs-300">Video and Sound</p>
						<ul>
							<li>
								<FontAwesomeIcon icon={faPlay} />
								<p>Fixed a bug where video quality settings were not correctly applying.</p>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default PatchNotesCreator;
