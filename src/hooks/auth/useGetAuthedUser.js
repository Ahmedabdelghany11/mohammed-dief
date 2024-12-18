import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utilities/axiosInstance";
import useAuth from "./useAuth";

function useGetAuthedUser() {
  const { isAuthed } = useAuth();

  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["authed-user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/Identity/UserData");
        if (res.status === 200) {
          return res.data.data;
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }
    },
    enabled: isAuthed,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error, refetch, isFetched };
}

export default useGetAuthedUser;
