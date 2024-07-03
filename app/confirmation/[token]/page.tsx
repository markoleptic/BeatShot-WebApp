import Confirmation from "@/webpages/auth/Confirmation";
import type { TokenParams } from "@/types/auth.types";
import React from "react";

const Page = ({ params }: { params: TokenParams }) => {
	return <Confirmation params={params} />;
};
export default Page;
