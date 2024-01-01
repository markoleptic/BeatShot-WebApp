import Confirmation from "@/components/Auth/Confirmation";
import { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ params }: TokenParams) => {
	return <Confirmation params={params} />;
};
export default Page;
