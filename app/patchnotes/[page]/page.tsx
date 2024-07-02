import PatchNotes from "@/src/webpages/patchNotes/PatchNotes";
import React from "react";

const Page = ({ params }: { params: { page: string } }) => {
	const currentPage = parseInt(params.page, 10);
	return <PatchNotes initialPage={currentPage || 1} />;
};

export default Page;
