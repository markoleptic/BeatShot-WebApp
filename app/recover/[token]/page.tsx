import ChangePassword from "@/src/webpages/auth/ChangePassword";
import type { TokenParams } from "@/types/auth.types";
import React from "react";

const Page = ({ params }: { params: TokenParams }) => {
	return <ChangePassword params={params} />;
};
export default Page;
