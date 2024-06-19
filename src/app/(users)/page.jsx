"use client";

import HomeCarousel from "@/components/user/Carousel";
import { CarouselSize } from "@/components/user/Categories";
import ProductDisplay from "@/components/user/ProductDisplay";
import Style from "@/components/user/Style";
import TrendingCollection from "@/components/user/TrendingCollection";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <CarouselSize title="Shop by Categories" />
      <TrendingCollection />
      <ProductDisplay title="Shop by Arts & Crafts" url="/arts-&-crafts" />
      <Style />
      <ProductDisplay title="Purses & Bags" url="/bags-&-purses" />
    </>
  );
};

export default Home;
