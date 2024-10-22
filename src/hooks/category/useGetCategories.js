import { useQuery } from "@tanstack/react-query";
import { getItemsCategories } from "../../services/apiCategories";

function useGetCategories() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: getItemsCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetCategories;
