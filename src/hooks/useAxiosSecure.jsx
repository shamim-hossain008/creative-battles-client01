import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("error tracked in the interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          try {
            await logOut();
            navigate("/login", { replace: true });
          } catch (logoutError) {
            console.error("Error during logout", logoutError);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.response.eject(interceptor); // Cleanup on unmount
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
