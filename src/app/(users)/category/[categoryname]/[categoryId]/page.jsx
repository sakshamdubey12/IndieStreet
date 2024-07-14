"use client"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsByCategoryQuery } from "@/redux/slices/user/GetAllProduct";
import { setSortBy, setFilters } from "@/redux/slices/user/productFilterSortSlice";
import { addToCart } from "@/redux/slices/user/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/user/wishlistSlice";
import { FilterIcon, SortDescIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Header from "@/components/user/Header";
import ProductCard from "@/components/user/ProductCard";
import Filter from "@/components/user/Filter";

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
  const priceRange = useSelector((state) => state.sort.filters.priceRange);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);
  const [savedFilters, setSavedFilters] = useState(null);

  // Load filters from local storage when the component mounts
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    console.log(savedFilters)
    if (savedFilters) {
      dispatch(setFilters(savedFilters));
      setSavedFilters(savedFilters);
      handleFiltersChange(savedFilters);
    }
  }, [dispatch]);

  const handleFiltersChange = (filters) => {
    // Calculate the number of selected filters
    let count = 0;
    if (filters && filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== Infinity)) {
      count++;
    }
    setSelectedFiltersCount(count);
  };

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

  const handleApplyFilters = (filters) => {
    dispatch(setFilters(filters));
    setIsSheetOpen(false); // Close the filter sheet after applying
  };

  const filterByCategoryAndPrice = (productList) => {
    let filteredProducts = productList?.filter((product) => {
      return product?.categoryName?.toUpperCase() === productName.toUpperCase();
    });

    if (priceRange) {
      filteredProducts = filteredProducts?.filter((product) => {
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });
    }

    return sortProducts(filteredProducts);
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

  return (
    <section className="px-[5%] md:py-16 sm:py-8 py-5 mx-auto max-w-[100rem]">
      <div className="filter flex items-end justify-between md:mb-4 sm:mb-3 mb-2 border-b-2">
        <Header title={productName} className="block text-end mb-2 pb-0" />
        <div className="selected"></div>
        <div className="innerfilters pb-2 flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className=" flex text-gray-600 py-2 px-2.5 h-10 rounded border bg-gray-200/60 hover:bg-gray-200/60">
              <FilterIcon className="sm:w-4 w-3.5 sm:h-4 h-3.5" /> {selectedFiltersCount > 0 && (
                <span className="relative right-1 -top-2 bg-white text-[#4E1B61] font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center">
                  {selectedFiltersCount}
                </span>
              )}
              
            </SheetTrigger>
            <SheetContent className=" bg-slate-600" side="left">
              <SheetHeader className="">
                <SheetTitle className="border-b p-4 text-xl font-semibold mb-4"><h1>Filter Options</h1> </SheetTitle>
                <SheetDescription>
                Select your preferences to filter the products.
                  <Filter onClose={() => setIsSheetOpen(false)} onApplyFilters={handleFiltersChange} />
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
                className="hover:shadow-[0_0_10px_rgba(78,27,97,0.1)] rounded-xl"
              >
                <CardHeader className="rounded-xl skeleton"></CardHeader>
                <CardContent className="grid gap-2 px-6 py-3.5">
                  <div className="skeleton w-[80%] h-[18px] rounded-md"></div>
                  <div className="skeleton w-[40%] h-[14px] rounded-md"></div>
                </CardContent>
                <CardFooter className="px-6 pt-0 pb-6 flex gap-2">
                  <div className="skeleton w-[50%] h-[20px] rounded-md"></div>
                  <div className="skeleton w-[30%] h-[20px] rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </>
        ) : (
          filterByCategoryAndPrice(products)?.map((product, index) => {
            return (
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
                handleWishlist={handleWishlist}
                wishlistIDs={wishlistIDs}
                key={index}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Products;
