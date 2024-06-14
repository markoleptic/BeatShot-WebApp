import ChangePassword from "@/components/Auth/ChangePassword";
import type { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ params }: { params: TokenParams }) => {
	return <ChangePassword params={params} />;
};
export default Page;
