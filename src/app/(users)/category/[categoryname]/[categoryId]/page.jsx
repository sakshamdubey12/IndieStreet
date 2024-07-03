"use client";
import Header from "@/components/user/Header";
import { FilterIcon, SortDescIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsByCategoryQuery } from "@/redux/slices/GetAllProduct";
import { setSortBy } from "@/redux/slices/productFilterSortSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";
import ProductCard from "@/components/user/ProductCard";

const Products = ({ params }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);
  const [wishlistIDs, setWishlistIDs] = useState([]);
  const [productName, setProductName] = useState(() => {
    const string = params.categoryname;
    const capitalizedFirstPart = string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return capitalizedFirstPart;
  });
  const [productCategoryId, setProductCategoryId] = useState(params.categoryId);
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useGetProductsByCategoryQuery();
  const sortBy = useSelector((state) => state.sort.sortBy);

  useEffect(() => {
    setProductName(() => {
      const string = params.categoryname;
      const capitalizedFirstPart = string
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return capitalizedFirstPart;
    });
    setProductCategoryId(params.categoryId);
  }, [params]);

  const sortProducts = (products) => {
    switch (sortBy) {
      case "title-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "title-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  const handleSortChange = (value) => {
    if (
      value === "title-asc" ||
      value === "title-desc" ||
      value === "price-asc" ||
      value === "price-desc"
    ) {
      dispatch(setSortBy(value));
    }
  };

  const filterByCategory = (productList) => {
    const list = productList.filter((product) => {
      return product.categoryName.toUpperCase() === productName.toUpperCase();
    });
    return sortProducts(list);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleWishlist = (ProductId) => {
    if (wishlistIDs.includes(ProductId)) {
      handleRemoveFromWishlist(ProductId);
    } else {
      handleAddToWishlist(ProductId);
    }
  };

  useEffect(() => {
    const ids = wishlistItems.map((item) => item.id);
    setWishlistIDs(ids);
  }, [wishlistItems]);

  console.log(products);

  return (
    <section className="px-[5%] md:py-16 sm:py-8 py-5 mx-auto max-w-[100rem]">
      <div className="filter flex items-end justify-between md:mb-4 sm:mb-3 mb-2 border-b-2">
        <Header title={productName} className="block text-end mb-2 pb-0" />
        <div className="selected"></div>
        <div className="innerfilters pb-2 flex items-center">
          <Sheet>
            <SheetTrigger className="text-gray-600 py-2 px-2.5 h-10 rounded border bg-gray-200/60 hover:bg-gray-200/60">
              <FilterIcon className="sm:w-4 w-3.5 sm:h-4 h-3.5" />
            </SheetTrigger>
            <SheetContent className=" bg-white" side="left">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[150px] ml-2 text-gray-600 py-2 px-2.5 h-10 rounded border border-gray-200 bg-gray-200/60 hover:bg-gray-200/60">
              <SortDescIcon className="sm:w-4 w-3.5 sm:h-4 h-3.5" />{" "}
              <span className="sm:text-base text-sm">Sort By</span>
            </SelectTrigger>
            <SelectContent className=" bg-white w-[150px]">
              <SelectItem value="title-asc" className="px-6 text-xs">
                Title: A to Z
              </SelectItem>
              <SelectItem value="title-desc" className="px-6 text-xs">
                Title: Z to A
              </SelectItem>
              <SelectItem value="price-asc" className="px-6 text-xs">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-desc" className="px-6 text-xs">
                Price: High to Low
              </SelectItem>
              <SelectItem value="relevant" className="px-6 text-xs">
                Relevant
              </SelectItem>
              <SelectItem value="newest" className="px-6 text-xs">
                Newest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="products-listing grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-1000 p-0 rounded overflow-hidden cursor-pointer border m-0 animate-pulse"
              >
                <CardHeader className="p-0 relative top-0 space-y-0">
                  <div className="icons absolute top-3 right-3 flex flex-col justify-center items-center">
                    <div className="py-2.5 px-2.5 rounded-full text-sm bg-gray-300 mb-2"></div>
                  </div>
                  <div className="w-full h-56 bg-gray-300 rounded-lg"></div>
                  <div className="absolute bottom-0 py-2 text-sm bg-gray-300 w-full"></div>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-sm mb-2 line-clamp-2 font-normal bg-gray-300 h-6 w-3/4"></div>
                  <CardDescription className="flex flex-col items-baseline">
                    <span className="mb-1 flex items-center">
                      <span className="text-base font-medium text-red-600 mr-1.5 bg-gray-300 h-5 w-10"></span>
                      <span className="line-through text-sm mr-3 bg-gray-300 h-5 w-10"></span>
                      <span className="bg-gray-300 h-5 w-10"></span>
                    </span>
                    <span className="flex items-center w-full text-sm mb-2">
                      <span className="flex mr-1.5">
                        <FaStar className="mr-1 mt-0.5 text-gray-300" />
                        <span className="font-semibold bg-gray-300 h-6 w-8"></span>
                      </span>
                      <span className="block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
                      <span className="font-medium underline bg-gray-300 h-6 w-16"></span>
                    </span>
                  </CardDescription>
                  <CardFooter className="flex">
                    <div className="w-1/2 !text-sm bg-gray-300 h-10 mr-2 py-2.5"></div>
                    <div className="w-1/2 !text-sm bg-gray-300 h-10 py-2.5"></div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            {filterByCategory(products).map((product) => (
              <div
                className="card-container sm:scale-100 scale-95"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
