"use client";

import React, { useState } from "react";
import StylishHeader from "./StylishHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    src: "https://images.pexels.com/photos/904117/pexels-photo-904117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Women",
  },
  {
    src: "https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg",
    gender: "Children",
  },
  {
    src: "https://images.pexels.com/photos/1321943/pexels-photo-1321943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gender: "Men",
  },
];

const Style = () => {
  return (
    <section className=" px-[5%] lg:py-16 md:py-14 py-10 bg-[#4E1B61]">
      <div className=" grid xl:grid-cols-4 grid-cols-1 mx-auto max-w-[100rem]">
        <div className="header xl:col-span-1 flex justify-center items-center">
          <StylishHeader
            title="Discover your fashion"
            className=" xl:w-[70%] w-full"
          />
        </div>
        <div className="relative lg:w-full lg:col-span-3 lg:flex flex-wrap lg:flex-nowrap grid grid-cols-3 gap-1">
          {items.map((item, index) => (
            <Link href="/" key={index}>
              <div
                className="rounded-lg overflow-hidden text-2xl font-medium text-center relative before:w-full before:h-full before:absolute before:transition-all before:ease-in-out before:duration-150 hover:before:bg-[#0000005d] lg:w-80 lg:h-96 md:h-80 sm:h-72 h-48 w-full flex-shrink-0 flex justify-center items-center md:mx-2 sm:mx-1 mx-0.5 cursor-pointer group"
                style={{ borderRadius: "10px" }}
                //  md:w-56  sm:w-44 w-36
              >
                <Card className="h-full w-full cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center w-full h-full">
                    <Image
                      src={item.src}
                      width={1000}
                      height={1000}
                      style={{ objectFit: "cover" }}
                      className=" w-full h-full"
                      alt=""
                    />
                    <span className="absolute text-[#fff] lg:text-2xl md:text-xl sm:text-lg text-base group-hover:top-[50%] top-[70%] opacity-0 group-hover:opacity-100 ease-in-out duration-500 transition-all">{item.gender}</span>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Style;
