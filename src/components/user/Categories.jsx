"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "./Header";
import { useGetProductCategoryQuery } from "@/redux/slices/ProductCategorySlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function CarouselSize({ title }) {
  const router = useRouter();
  const { data: categoryData, error, isLoading } = useGetProductCategoryQuery();
  return (
    <section className="px-[5%] lg:py-16 md:py-12 sm:py-10 py-4">
      <div className="category max-w-[100rem] mx-auto">
        <Header title={title} />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[92%] mx-auto"
        >
          <CarouselPrevious className="border-2 border-black text-black lg:top-20 md:top-16 top-12 sm:-left-14 -left-8" />

          <CarouselContent className="p-3">
            {categoryData?.data?.map((category) => (
              <CarouselItem
                key={category._id}
                className="md:basis-1/2 lg:basis-1/3 hover:scale-105 ease-in-out transition-all duration-150 lg:max-w-40 md:max-w-32 max-w-24 md:mx-0.5 mx-0"
              >
                <Link
                  className=" block"
                  href={`/category/${category.categoryName
                    .toLowerCase()
                    .replace(" ", "-")}/${category._id}`}
                >
                  {" "}
                  <div className=" cursor-pointer">
                    <Card
                      className="relative hover:before:absolute hover:before:w-full 
                hover:before:h-full hover:before:left-0 hover:before:top-0 hover:before:z-10 hover:before:bg-[#ffffff30] before:ease-in-out before:duration-150 before:transition-all w-full h-full p-0 m-0"
                    >
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          style={{ objectFit: "cover" }}
                          fill
                          src={
                            category.imageUrl
                              ? category.imageUrl
                              : "https://via.placeholder.com/150"
                          }
                          alt={category.categoryName}
                          className="object-cover rounded-xl w-full h-full outline-1 outline-offset-4 outline outline-[#4E1B61]"
                        />
                      </CardContent>
                    </Card>
                    <p className="text-center mt-2 font-medium lg:text-base md:text-sm text-xs">
                      {category.categoryName}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="border-black text-black lg:top-20 md:top-16 top-12 sm:-right-14 -right-8" />
        </Carousel>
      </div>
    </section>
  );
}
