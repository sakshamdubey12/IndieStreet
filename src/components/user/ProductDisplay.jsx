import Link from "next/link";
import Header from "./Header";
import { useGetProductsByCategoryQuery } from "@/redux/slices/user/GetAllProduct";
import ProductCard from "./ProductCard";

const ProductDisplay = ({ title, url }) => {
  const { data: products } = useGetProductsByCategoryQuery();
  const filterByCategory = (productList) => {
    const list = productList?.filter((product) => {
      return product?.categoryName?.toUpperCase() === title?.toUpperCase();
    });
    return list;
  };

  return (
    <section className=" px-[5%] lg:py-16 md:py-12 sm:py-10 py-6 mx-auto max-w-[100rem]">
      <div className="header flex items-center justify-between md:mb-8 sm:mb-4 mb-0">
        <Header title={title} className="mt-4" />
        <Link
          href={url}
          className="border border-[#4E1B61] text-[#4E1B61] hover:bg-[#4E1B61] hover:text-[#CDF520] transition-all ease-in-out duration-200 font-medium lg:px-5 lg:py-2 px-3.5 py-1.5 md:text-base sm:text-sm text-xs rounded"
        >
          View More
        </Link>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2">
        {filterByCategory(products)
          ?.slice(0, window.innerWidth >= 1280 ? 5 : 4)
          .map((product) => (
            <div
              className="card-container sm:scale-100 scale-95"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDisplay;
