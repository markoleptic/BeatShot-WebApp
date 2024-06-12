import Confirmation from "@/components/Auth/Confirmation";
import type { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ token }: TokenParams) => {
	return <Confirmation token={token} />;
};
export default Page;
