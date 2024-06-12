import ChangePassword from "@/components/Auth/ChangePassword";
import type { TokenParams } from "@/types/Interfaces";
import React from "react";

const Page = ({ token }: TokenParams) => {
	return <ChangePassword token={token} />;
};
export default Page;
