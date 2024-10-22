import { useQuery } from "@tanstack/react-query";
import { getColors } from "../../services/apiColors";

function useGetColors() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetColors;
