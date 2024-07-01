"use client";

import BannerCarousel from "@/components/user/BannerCarousel";
import { CarouselSize } from "@/components/user/Categories";
import ProductDisplay from "@/components/user/ProductDisplay";
import Style from "@/components/user/Style";
import TrendingCollection from "@/components/user/TrendingCollection";
import React, { useEffect } from "react";
import { useGetProductCategoryQuery } from "@/redux/slices/ProductCategorySlice";

const Home = () => {
  const { data } = useGetProductCategoryQuery();
  return (
    <>
      <BannerCarousel />
      <CarouselSize title="Shop by Categories" />
      <TrendingCollection />
      <ProductDisplay
        title={data?.data[0]?.categoryName}
        url={`/category/${data?.data[0]?.categoryName
          .toLowerCase()
          .replace(" ", "-")}/${data?.data[0]?._id}`}
      />
      <Style />
      <ProductDisplay
        title={data?.data[1]?.categoryName}
        url={`/category/${data?.data[1]?.categoryName
          .toLowerCase()
          .replace(" ", "-")}/${data?.data[1]?._id}`}
      />
    </>
  );
};

export default Home;
