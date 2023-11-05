import { useAuthContext } from "../components/Auth/AuthContext";
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
        console.log("Successful logout");
        router.push("/login")
      }

    } catch (error) {
      console.log(error);
    }
  };
  // returns the function, not a value
  return Logout;
};

export default useLogout;
