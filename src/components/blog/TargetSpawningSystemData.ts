import type { BlogPostData } from "@/types/blog.types";
import { DateTime } from "luxon";

import image_Card from "public/targetSpawningSystem/Part1Card.jpg";

const titleShort = "BeatShot's Target Spawning System: Part 1 | Developer Blog";
const titleLong = "BeatShot's Target Spawning System: Part 1 - Core Classes and Conventions";
const description =
	"Learn about the classes, state management systems, and some of the conventions used to create a target spawning " +
	"system in an aim-training game.";
const postDate: DateTime = DateTime.fromFormat("July 2, 2023", "DDD");
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
