import ChangePassword from "@/components/Auth/ChangePassword";
import { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ params }: TokenParams) => {
	return <ChangePassword params={params} />;
};
export default Page;
