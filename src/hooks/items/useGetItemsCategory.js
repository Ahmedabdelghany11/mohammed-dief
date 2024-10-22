import { useQuery } from "@tanstack/react-query";
import { getItemsCategories } from "../../services/apiCategories";

function useGetItemsCategory() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryItems"],
    queryFn: getItemsCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetItemsCategory;
