"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
	const router = useRouter();
	const { setAuth, setProfileInfo } = useAuthContext();

	useEffect(() => {
		async function logoutWrapper() {
			try {
				const response = await fetch("/api/logout");
				if (response.ok) {
					setAuth(null);
					setProfileInfo(null);
					router.push("/login");
					router.refresh();
				}
			} catch (error) {
				console.log(error);
			}
		}
		logoutWrapper();
	}, [router, setAuth, setProfileInfo]);

	return null;
};

export default Logout;
