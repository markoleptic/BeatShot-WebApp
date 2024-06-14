import Confirmation from "@/components/Auth/Confirmation";
import type { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ params }: { params: TokenParams }) => {
	return <Confirmation params={params} />;
};
export default Page;
