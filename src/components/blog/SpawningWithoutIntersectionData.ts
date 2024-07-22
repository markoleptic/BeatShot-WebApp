import type { BlogPostData } from "@/types/blog.types";
import { DateTime } from "luxon";

import image_Card from "public/spawningWithoutIntersection/Card.jpg";

const titleShort = "Spawning Targets Without Intersection | Developer Blog";
const titleLong = "Spawning Targets Without Intersection";
const description =
	"This article discusses the methods used to prevent target intersection and includes a section on testing " +
	"procedures created using Unreal Engine's Automation System.";
const postDate: DateTime = DateTime.fromFormat("July 21, 2024", "DDD");
const editDate: DateTime = DateTime.fromFormat("July 21, 2024", "DDD");

const blogPostData: BlogPostData = {
	titleShort: titleShort,
	titleLong: titleLong,
	description: description,
	cardImage: image_Card,
	postDate: postDate,
	editDate: editDate,
};

export default blogPostData;
