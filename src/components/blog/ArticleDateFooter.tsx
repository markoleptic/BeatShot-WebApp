"use client";

import React, { HTMLAttributes } from "react";

import { DateTime } from "luxon";

import "@/styles/Article.scss";

type ArticleDateFooterProps = HTMLAttributes<HTMLElement> & {
	postDate: DateTime;
	editDate: DateTime;
};

const ArticleDateFooter = ({ postDate, editDate, ...rest }: ArticleDateFooterProps): React.JSX.Element => {
	return (
		<div className="article-section" {...rest}>
			<p className="inline posted-date">
				<span className="inline text-light">Posted: </span>
				{postDate.toFormat("DDD")}
				<br></br>
				<time dateTime={editDate.toHTTP() as string}>
					<span className="inline text-light">Updated: </span>
					{editDate.toFormat("DDD")}
				</time>
			</p>
		</div>
	);
};

export default ArticleDateFooter;
