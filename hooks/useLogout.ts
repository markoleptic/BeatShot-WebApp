import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// clears auth and refresh token in database
const useLogout = () => {
	const router = useRouter();
	const { setAuth } = useAuthContext();
	const Logout = async () => {
		// clear the Auth state
		setAuth(null);
		try {
			const response = await fetch("/api/logout");
			if (response.ok) {
				router.push("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return Logout;
};

export default useLogout;
