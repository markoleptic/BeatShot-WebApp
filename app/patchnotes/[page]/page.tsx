import React from "react";

import PatchNotes from "@/webpages/patchNotes/PatchNotes";

const Page = async ({ params }: { params: Promise<{ page: string }> }) => {
	const { page } = await params;
	const currentPage = parseInt(page, 10);
	return <PatchNotes initialPage={currentPage || 1} />;
};

export default Page;
