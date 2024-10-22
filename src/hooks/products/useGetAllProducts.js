import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../utilities/axiosInstance";

function useGetAllProducts() {
  const {
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get("/Items/AllItems", {
        pageNo: pageParam,
        itemCount: 10,
      });
      if (res.status === 200) {
        console.log({
          data: res?.data?.data,
          total: res.data?.count,
          per_page: res.data?.pageCount,
        });

        return {
          data: res?.data?.data,
          total: res.data?.count,
          per_page: res.data?.pageCount,
        };
      } else {
        throw new Error("Failed to fetch products");
      }
    },

    getNextPageParam: (lastPage, pages) => {
      const isMore = lastPage.data.length >= lastPage.per_page;
      return isMore ? pages.length + 1 : undefined;
    },

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    isLoading,
    data: data?.pages.flatMap((page) => page.data) || [],
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useGetAllProducts;
