import Header from "./Header";
import { FilterIcon, HeartIcon, ShoppingBagIcon, SortDescIcon } from "lucide-react";
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

import { useRouter } from "next/navigation";

const Products = (props) => {


  return (
    <section className="px-[5%] py-16">
      <div className="filter flex items-center justify-between mb-4 border-b-2">
        <Header />
        <div className="selected"></div>
        <div className="innerfilters pb-2 flex items-center">
          <Sheet>
            <SheetTrigger className="flex items-center text-[#4E1B61] border px-4 py-2 rounded border-[#4E1B61]">
              <FilterIcon />
              <span className=" ml-2">Filter</span>
            </SheetTrigger>
            <SheetContent className=" bg-white">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Select >
            <SelectTrigger className="w-[200px] ml-2 rounded text-[#4E1B61] border border-[#4E1B61]">
              <SortDescIcon /> <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="title-asc">Title: A to Z</SelectItem>
              <SelectItem value="title-desc">Title: Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="relevant">Relevant</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
{/* 
      <div className="products-listing grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {sortProducts(products).map((product) => (
          <div
            className="card-cont"
            key={product.id}
            onClick={() => {
              router.push(`/${props.slug}/${product.id}`);
            }}
          >
            <Card className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-200 p-0 rounded overflow-hidden cursor-pointer border m-0">
              <CardHeader className="p-0 relative top-0 space-y-0">
                <div className="icons absolute top-3 right-3 flex flex-col justify-center items-center">
                <button className="py-2.5 px-2.5 rounded-full text-sm bg-white/90 text-[#4E1B61] font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all mb-2">
                  <HeartIcon className=" w-5 h-5" />
                </button>
                <button className="py-2.5 px-2.5 rounded-full text-sm bg-white/90 text-[#4E1B61] font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all mb-2">
                  <ShoppingBagIcon className=" w-5 h-5" />
                </button>
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <button className=" absolute bottom-0 py-2.5 w-full text-sm bg-white/90 font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all">
                  Buy Now
                </button>
              </CardHeader>
              <CardContent className=" p-2">
                <CardTitle className=" text-sm mb-2 line-clamp-2 h-10 font-normal">
                  {product.title}
                </CardTitle>
                <CardDescription className=" flex justify-between items-center">
                  <span className="text-base font-medium text-red-600">
                    ${product.price}
                  </span>
                </CardDescription>
                <CardFooter>
                  <div className="flex items-center w-full text-sm">
                    <span className="flex mr-1.5">
                      <FaStar className=" mr-1 mt-0.5 text-yellow-500" />
                      <span className=" font-semibold">
                        {product.rating.rate}
                      </span>
                    </span>
                    <span className=" block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
                    <span className=" font-medium underline">
                      {product.rating.count} Reviews
                    </span>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default Products;
