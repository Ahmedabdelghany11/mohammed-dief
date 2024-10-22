import { useQuery } from "@tanstack/react-query";
import { getTaxes } from "../../services/apiGeneral";

function useGetTaxes() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["taxes"],
    queryFn: getTaxes,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetTaxes;
