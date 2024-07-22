import type { BlogPostData } from "@/types/blog.types";
import { DateTime } from "luxon";

import image_Card from "public/targetSpawningSystem/Part2Card.jpg";

const titleShort = "BeatShot's Target Spawning System: Part 2 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 2 - Target Lifecycle";
const description =
	"Discover how the classes and conventions introduced in Part 1 work together, as key functions and their roles are outlined throughout the target lifecycle.";
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
