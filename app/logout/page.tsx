"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
	const router = useRouter();
	const { setAuth } = useAuthContext();

	useEffect(() => {
		async function logoutWrapper() {
			try {
				const response = await fetch("/api/logout");
				if (response.ok) {
					setAuth(null);
					router.push("/login");
					router.refresh();
				}
			} catch (error) {
				console.log(error);
			}
		}
		logoutWrapper();
	}, [router, setAuth]);

	return null;
};

export default Logout;
