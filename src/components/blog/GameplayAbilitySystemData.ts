import type { BlogPostData } from "@/types/blog.types";
import { DateTime } from "luxon";

import image_Card from "public/gameplayAbilitySystem/Card.jpg";

const titleShort = "GAS in BeatShot | Developer Blog";
const titleLong = "An Overview of Unreal's Gameplay Ability System in BeatShot";
const description =
	"Why is the Gameplay Ability System used in BeatShot? This article explains the role of GAS and " +
	"provides a walkthrough of a common ability.";
const postDate: DateTime = DateTime.fromFormat("September 15, 2023", "DDD");
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
