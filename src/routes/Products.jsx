import { useEffect, useRef } from "react";
import useGetAllProducts from "../hooks/products/useGetAllProducts";
import ProductCard from "../ui/cards/ProductCard";

function Products() {
  const {
    data: products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllProducts();

  const sectionRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, sectionRef]);

  return (
    <div className="landing d-flex flex-column gap-4 p-4" ref={sectionRef}>
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}

      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(1)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                loading...
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Products;
