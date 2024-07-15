import { DateTime } from "luxon";
import { StaticImageData } from "next/image";

export type BlogPostData = {
	titleShort: string;
	titleLong: string;
	description: string;
	cardImage: StaticImageData;
	postDate: DateTime;
	editDate: DateTime;
};
