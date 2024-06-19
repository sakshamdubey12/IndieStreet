"use client";

import React, { useState } from "react";
import StylishHeader from "./StylishHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const items = [
  "https://images.pexels.com/photos/13094233/pexels-photo-13094233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4053188/pexels-photo-4053188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const TrendingCollection = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="px-[5%] lg:py-16 md:py-12 sm:py-10 py-4 bg-[#4E1B61]">
      <div className="grid lg:grid-cols-6 grid-cols-1 mx-auto max-w-[100rem]">
        <div className="header md:col-span-1 flex justify-center items-center">
          <StylishHeader title="trending collection" className="lg:mb-8 sm:mb-5 mb-2" />
        </div>
        <div className="relative w-full overflow-hidden md:col-span-5">
        <Carousel
          opts={{
            align: "start",
          }}
          className="lg:w-[90%] sm:w-[85%] w-full mx-auto"
        >
          <CarouselContent className="p-3">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 mr-2 lg:max-w-64 md:max-w-52 sm:max-w-44 max-w-32"
              >
                <div className="lg:w-64 lg:h-72 md:w-52 md:h-64 sm:w-44 sm:h-52 w-32 h-40">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center">
                      <Image
                        src={item}
                        width={1000}
                        height={1000}
                        style={{ objectFit: "cover" }}
                        // layout="fill"
                        className="rounded-xl w-full h-full"
                        alt={`Item ${index + 1}`}
                      />
                    </CardContent>
                  </Card>
                  <p className="text-[#CDF520] text-center mt-2 md:text-base sm:text-sm text-xs">Item</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="top-5 !text-[#CDF520] border-2 border-[#CDF520] lg:-left-12 sm:block hidden" />
          <CarouselNext className="top-5 !text-[#CDF520] border-2 border-[#CDF520] lg:-right-12 sm:block hidden" />
        </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrendingCollection;
