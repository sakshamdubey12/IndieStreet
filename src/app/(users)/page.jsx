"use client";

import BannerCarousel from "@/components/user/BannerCarousel";
import { CarouselSize } from "@/components/user/Categories";
import ProductDisplay from "@/components/user/ProductDisplay";
import Style from "@/components/user/Style";
import TrendingCollection from "@/components/user/TrendingCollection";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <>
      <BannerCarousel />
      <CarouselSize title="Shop by Categories" />
      <TrendingCollection />
      <ProductDisplay title="Shop by Arts & Crafts" url="/category/arts-&-crafts" />
      <Style />
      <ProductDisplay title="Purses & Bags" url="/category/bags-&-purses" />
    </>
  );
};

export default Home;
