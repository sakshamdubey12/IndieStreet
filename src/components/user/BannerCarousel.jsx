"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const images = [
  "https://images.pexels.com/photos/7399418/pexels-photo-7399418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5865148/pexels-photo-5865148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const BannerCarousel = () => {
  return (
    <div className="relative w-full lg:h-[30rem] md:h-[28rem] sm:h-[24rem] h-[18rem]">
      <Carousel className="!w-full h-full">
        <CarouselContent className="min-w-full lg:h-[30rem] md:h-[28rem] sm:h-[24rem] h-[18rem]">
          {images.map((img, index) => (
            <CarouselItem key={index} className="h-full min-w-full">
              <Image
              width={1000}
              height={1000}
                src={img}
                alt={`Image ${index + 1}`}
                className="!min-w-full !h-full object-cover"
              />
              {img}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 !h-24 bg-[#4E1B61] text-white hover:text-white rounded-l-none rounded-r-xl hover:bg-[#4E1B61] border-0" />
        <CarouselNext className="right-0 !h-24 bg-[#4E1B61] text-white hover:text-white rounded-l-xl rounded-r-none hover:bg-[#4E1B61] border-0" />
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
