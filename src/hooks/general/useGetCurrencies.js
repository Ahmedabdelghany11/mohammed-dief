import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../../services/apiGeneral";

function useGetCurrencies() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetCurrencies;
