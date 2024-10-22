import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../services/apiUnits";

function useGetUnits() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetUnits;
